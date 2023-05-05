<!DOCTYPE html>
<html>

<head>

</head>

<body>

    <h1>Пример выполнения лабораторной работы</h1>
    <form action="" method="POST" onSubmit="javascript: return getData(this)">
        Первый массив
        <input type="text" name="mas1" id="id_mas1" value=""> <br>
        Второй массив
        <input type="text" name="mas2" id="id_mas2">
        <br>

        <button class="btn" id="btn-union" type="button">Объединение</button>
        <button class="btn" id="btn-intersection" type="button">Пересечение</button>
        <button class="btn" id="btn-addition" type="button">Дополнение</button>
        <button class="btn" id="btn-difference" type="button">Сим. разность</button>
    </form>
    <br><br>
    <div id="result">


    </div>



    <script src="./scripts/functions.js" type="text/javascript"></script>
</body>
<html>