<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Document</title>
</head>

<body>
    <h1>Лабораторная работа №4 нахождение кратчайшего пути в графе</h1>
    <h2>Вариант №14: неориентированный, матрицей</h2>
    <form action="" method="POST">
        Введите множество вершин через пробел<br>
        <input type="text" name="mas" value="<?php if (!empty($_POST["mas"]))
            echo $_POST['mas']; ?>"><br>
        Введите начальную вершину<br>
        <input type="text" name="start" value="<?php if (!empty($_POST["start"]))
            echo $_POST['start']; ?>"><br>
        Введите конечную вершину<br>
        <input type="text" name="end" value="<?php if (!empty($_POST["end"]))
            echo $_POST['end']; ?>"><br>
        Введите весовую матрицу:<br>
        <small>(-1 при отсутствии пути, 0 по главной диагонали)<br></small>
        <textarea class="textarea" type="text" name="masOfMas" id="id_masOfMas"><?php if (!empty($_POST["masOfMas"]))
            echo $_POST['masOfMas']; ?></textarea><br>
        <br>
        <input type="submit" name="button1" class="button" value="Рассчитать значения" />
        <input type="button" name="button2" class="button_active" onclick="location.href=''" value="Очистить" />
    </form>
    <br><br>
    <div id="result">
        <?php
        include('scripts/main.php');
        ?>
    </div>
</body>

</html>