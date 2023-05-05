<?php
/**
 * Запуск скрипта от нажатия кнопки
 */
if (isset($_POST['button1'])) {
    echo "Результат выполнения:<br><br>";
    main();
}

$masOfMas = array();
$comps = array();
$used = array();

/**
 * Валидация параметров ввода
 * @param $mas
 * @param $start
 * @param $end
 */
function validation($mas, $start, $end)
{
    $res = true;
    $isNum = true;
    $isZero = true;
    global $masOfMas;

    if (sizeof($mas) != sizeof(array_unique($mas))) {
        $res = false;
        echo "В множестве вершин обнаружены повторяющиеся элементы<br>";
    }

    for ($i = 0; $i < sizeof($mas); ++$i) {
        $masOfMas[$i] = explode(" ", $masOfMas[$i]);
        if ($masOfMas[$i][$i]) {
            $isZero = false;
            $res = false;
        }
        for ($j = 0; $j < sizeof($masOfMas[$i]); ++$j) {
            if (!is_numeric($masOfMas[$i][$j]) || $masOfMas[$i][$j] < -1) {
                $isNum = false;
                $res = false;
            }
        }
        if (sizeof($masOfMas[$i]) != sizeof($mas)) {
            echo "Неверное количество элементов в ", ($i + 1), " строке <br>";
            $res = false;
        }
    }

    if (!$isNum)
        echo "Матрица смежности может содержать только числа [-1; +inf) <br>";

    if (!$isZero)
        echo "Главная диагональ матрицы может иметь только нули<br>";

    return 1;
}

/**
 * Применение алгоритма дейкстры для нахождения кратчейшего пути в графе и его стоимости
 * @param $mas
 * @param $start
 * @param $end
 */
function dijkstra($mas, $start, $end)
{

    class edge
    {
        public $from, $to, $weight;
        public function __construct($from, $to, $weight)
        {
            $this->from = $from;
            $this->to = $to;
            $this->weight = $weight;
        }
    }
    ;

    $g = array();
    global $masOfMas;

    for ($i = 0; $i < sizeof($mas); ++$i) {
        if ($mas[$i] == $start)
            $start = $i;
        if ($mas[$i] == $end)
            $end = $i;
        for ($j = 0; $j < sizeof($mas); ++$j) {
            if ($masOfMas[$i][$j] != -1 && $i != $j) {
                $g[$i][] = new edge($i, $j, $masOfMas[$i][$j]);
                $g[$j][] = new edge($j, $i, $masOfMas[$i][$j]);
            }
        }
    }

    $empty = INF;
    $dist = array_fill(0, sizeof($mas), $empty);
    $parent = array_fill(0, sizeof($mas), 0);
    $used = array_fill(0, sizeof($mas), 0);

    $dist[$start] = 0;
    $parent[$start] = -1;
    for ($ind = 0; $ind < sizeof($mas); ++$ind) {
        $v = -1;
        for ($i = 0; $i < sizeof($mas); ++$i) {
            if (!$used[$i] && ($v == -1 || $dist[$i] < $dist[$v])) {
                $v = $i;
            }
        }
        if ($dist[$v] == $empty) {
            break;
        }
        $used[$v] = 1;
        foreach ($g[$v] as $i) {
            if ($dist[$v] + $i->weight < $dist[$i->to]) {
                $dist[$i->to] = $dist[$v] + $i->weight;
                $parent[$i->to] = $v;
            }
        }
    }

    if ($dist[$end] == $empty) {
        echo "Не существует путей между этими вершинами<br><br>";
        return;
    }
    echo "Стоимость кратчайшего пути:<br>", $dist[$end], "<br><br>";
    echo "Путь из ", $mas[$start], " в ", $mas[$end], ":<br>";
    $way = array();
    while ($end != -1) {
        $way[] = $end;
        $end = $parent[$end];
    }

    for ($i = sizeof($way) - 1; $i >= 0; --$i) {
        if ($i != sizeof($way) - 1)
            echo " -> ";
        echo ($mas[$way[$i]]);
    }
    echo "<br><br>";
}

function main()
{
    $mas = $_POST['mas'];
    $start = $_POST['start'];
    $end = $_POST['end'];
    $mas = explode(" ", $mas);
    global $masOfMas;
    $matrix_sv = array();
    for ($i = 0; $i < sizeof($mas); $i++) {
        $matrix_sv[$i] = array();
        $matrix_sv[$i][$i] = 0;
        // for ($j = $i + 1; $j < sizeof($versh); $j++) {
        //     $matrix_sv[$i][$j] = $ves[$i][$j];
        //     $matrix_sv[$j][$i] = $ves[$i][$j];
        // }
    }
    $masOfMas = $_POST['masOfMas'];
    $masOfMas = explode("\n", $masOfMas);

    if (!validation($mas, $start, $end))
        return;

    dijkstra($mas, $start, $end);

    unset($mas, $masOfMas, $start, $end, $comps, $used);
}
?>