/**
 * Валидация параметров ввода
 * @param masOfMas
 */
function validateElement(mas) {
    return;
}

/**
 * Проверка, являются ли отношения функцией
 * @param masOfMas
 */
function check(mas) {
    let res = [];
    let isFunction = true;
    for (let i = 0; i < mas.length; ++i) {
        let elem = mas.split(' ');
        if (res.includes(elem[0]) == 0) {
            res[elem[0]] = new Set();
        }
        res[elem[0]].add(elem[1]);
        if (res[elem[0]].size > 1) {
            isFunction = false;
        }
    }

    return isFunction;
}

/**
 * Основная функция
 */
function main() {
    let mas = document.getElementById('id_mas').value;
    document.getElementById('result').innerHTML = 'Результат: <br>';
    mas = mas.split(', ');
    let IsFunction = true;

    //if (!validateElement(masA, masB, masOfMas)) {
    //    return;
    // }

    IsFunction = check(mas);
    if (!IsFunction)
        document.getElementById('result').innerHTML += 'Отношения не являются функцией <br>';
    else document.getElementById('result').innerHTML += 'Отношения являются функцией <br>';
}

