function getData(forms) {
    const fData = new FormData(forms);
    console.log(fData);
    console.log(fData.get('mas1'));
    console.log(fData.get('mas2'));

    return false;
}

/**
 * Валидация параметров ввода
 */
function validateElement(element) {
    return (
        element[0] >= 0 &&
        element[0] <= 9 &&
        element[1] >= 'a' &&
        element[1] <= 'z' &&
        element[2] % 2 == 0 &&
        element[3] % 2 == 0
    );
}

/**
 * Объединение массивов
 * @param elementsArray1
 * @param elementsArray2
 * @returns {string}
 */
function unionArray(elementsArray1, elementsArray2) {
    let resultArray = [];
    for (let i = 0; i < elementsArray1.length; i++)
        if (!resultArray.includes(elementsArray1[i])) {
            resultArray[resultArray.length] = elementsArray1[i];
        }

    for (let i = 0; i < elementsArray2.length; i++)
        if (!resultArray.includes(elementsArray2[i])) {
            resultArray[resultArray.length] = elementsArray2[i];
        }
    return 'Объединение массивов: ' + resultArray.join(' - ');
}

/**
 * Пересечение массивов
 * @param elementsArray1
 * @param elementsArray2
 * @returns {string}
 */

function intersectionArray(elementsArray1, elementsArray2) {
    let resultArray = [];
    for (let i = 0; i < elementsArray1.length; i++) {
        for (let j = 0; j < elementsArray2.length; j++) {
            if (elementsArray1[i] === elementsArray2[j]) {
                if (!resultArray.includes(elementsArray1[i])) {
                    resultArray.push(elementsArray1[i]);
                }
            }
        }
    }
    return 'Пересечение массивов: ' + resultArray.join(' ');
}

/**
 * Дополнение массивов
 * @param elementsArray1
 * @param elementsArray2
 * @returns {string}
 */

function additionArray(elementsArray1, elementsArray2) {
    let resultArray = [];
    for (let i = 0; i < elementsArray1.length; i++) {
        if (!elementsArray2.includes(elementsArray1[i])) {
            if (!resultArray.includes(elementsArray1[i])) {
                resultArray.push(elementsArray1[i]);
            }
        }
    }
    return ' ' + resultArray.join(' - ');
}

/**
 * Сим. разность массивов
 * @param elementsArray1
 * @param elementsArray2
 * @returns {string}
 */

function differenceArray(elementsArray1, elementsArray2) {
    let resultArray = [];

    for (let i = 0; i < elementsArray1.length; i++) {
        if (!elementsArray2.includes(elementsArray1[i])) {
            if (!resultArray.includes(elementsArray1[i])) {
                resultArray.push(elementsArray1[i]);
            }
        }
    }
    for (let i = 0; i < elementsArray2.length; i++) {
        if (!elementsArray1.includes(elementsArray2[i])) {
            if (!resultArray.includes(elementsArray2[i])) {
                resultArray.push(elementsArray2[i]);
            }
        }
    }
    return 'Симметричная разность массивов: ' + resultArray.join(' - ');
}

// Блок вывода —-----------------------------------------------------------—
const resultBlock = document.getElementById('result');
// Кнопки —-----------------------------------------------------------—
const btns = document.querySelectorAll('.btn');
const btnUnion = document.getElementById('btn-union');
const btnIntersection = document.getElementById('btn-intersection');
const btnAddition = document.getElementById('btn-addition');
const btnDifference = document.getElementById('btn-difference');
// Функция вызова действия —-----------------------------------------------------------—
const handleClick = (event) => {
    // Массивы —-----------------------------------------------------------—
    let mas1 = document.getElementById('id_mas1').value;
    let mas2 = document.getElementById('id_mas2').value;

    if (mas1.trim().length <= 0 || mas2.trim().length <= 0) {
        resultBlock.innerHTML = 'Ошибка: пустые поля ввода';
        return;
    }

    let strError = '';
    mas1 = mas1.split(' ');
    mas2 = mas2.split(' ');
    console.log(mas1);

    // Доп. массивы для функций —-------------------------------------------------—
    for (let i = 0; i < mas1.length; i++) {
        if (!validateElement(mas1[i])) {
            strError += 'Ошибка в ' + (i + 1) + ' элементе первого массива \n';
        }
    }

    for (let i = 0; i < mas2.length; i++) {
        if (!validateElement(mas2[i]))
            strError += 'Ошибка в ' + (i + 1) + ' элементе второго массива';
    }

    if (strError === '') {
        document.getElementById('result').innerHTML = 'Результат рассчета:<br>';
        if (event.target == btnUnion) {
            document.getElementById('result').innerHTML += unionArray(mas1, mas2);
        } else if (event.target == btnIntersection) {
            document.getElementById('result').innerHTML += intersectionArray(mas1, mas2);
        } else if (event.target == btnAddition) {
            document.getElementById('result').innerHTML += 'от А до Б:';
            document.getElementById('result').innerHTML += additionArray(mas1, mas2);
            document.getElementById('result').innerHTML += '   от Б до А:';
            document.getElementById('result').innerHTML += additionArray(mas2, mas1);
        } else if (event.target == btnDifference) {
            document.getElementById('result').innerHTML += differenceArray(mas1, mas2);
        }
    } else {
        document.getElementById('result').innerHTML = strError;
    }
};
// Добавления события на кнопки —-------------------------------------------------------------------------—
btns.forEach((button) => {
    button.addEventListener('click', handleClick);
});
