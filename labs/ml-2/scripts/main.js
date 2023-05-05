function getData(forms) {
    const fData = new FormData(forms);
    console.log(fData);
    console.log(fData.get('mas1'));
    console.log(fData.get('mas2'));
    return false;
}

/**
 * Валдация параметров ввода
 */
function validateElement(element) {
    for (let i = 0; i < element.length; i++) {
        let iteration = 0;
        for (let j = 0; j < element.length; j++) {
            if (element[i] == element[j]) {
                iteration++;
            }
        }
        if (iteration > 1 || element[i] < 0 || element[i] > 9) {
            return;
        }
    }
    return element;
}

function validateRelation(validetion, element) {
    let check = 0;
    for (let i = 0; i < validetion.length; i++) {
        if (element[0] == validetion[i]) {
            check++;
        }
        if (element[2] == validetion[i]) {
            check++;
        }
    }
    if (check == 2 && element[1] == '-') {
        return element;
    } else {
        return;
    }
}

function reflect(element, relation) {
    let ref = 0;
    for (let i = 0; i < element.length; i++) {
        for (let j = 0; j < relation.length; j++) {
            mas1 = relation[j].split('-');
            if (element[i] == mas1[0] && mas1[0] == mas1[1]) {
                ref++;
                j = relation.length;
            }
        }
    }
    if (ref == element.length) {
        return 'Рефлексивно';
    }
    return 'Нет';
}

function symmetry(relation) {
    let sym = 0;
    for (let i = 0; i < relation.length; i++) {
        mas1 = relation[i].split('-');
        for (let j = 0; j < relation.length; j++) {
            mas2 = relation[j].split('-');
            if (mas1[0] == mas2[1] && mas1[1] == mas2[0]) {
                sym++;
                j = relation.length;
            }
        }
    }
    if (sym == relation.length) {
        return 'Симметрично';
    }
    return 'Нет';
}

function skewSymmetry(relation) {
    let ske = 0;
    for (let i = 0; i < relation.length; i++) {
        mas1 = relation[i].split('-');
        for (let j = 0; j < relation.length; j++) {
            mas2 = relation[j].split('-');
            if (mas1[0] == mas2[1] && mas1[1] == mas2[0] && mas1[1] == mas1[0]) {
                ske++;
                j = relation.length;
            }
        }
    }
    if (ske == relation.length) {
        return 'Кососимметрично';
    }
    return 'Нет';
}

function transitivity(relation) {
    let tra = 0;
    for (let i = 0; i < relation.length; i++) {
        mas1 = relation[i].split('-');
        for (let j = 0; j < relation.length; j++) {
            mas2 = relation[j].split('-');
            if (mas1[1] == mas2[0]) {
                for (let l = 0; l < relation.length; l++) {
                    mas3 = relation[l].split('-');
                    if (mas1[1] == mas2[0] && mas3[0] == mas1[0] && mas2[1] == mas3[1]) {
                        tra++;
                        j = relation.length;
                    }
                }
            }
        }
    }
    if (tra == 1) {
        return 'Транзитивно';
    }
    return 'Нет';
}

/**
 * Основная функция
 */
function main() {
    let mas1 = document.getElementById('id_mas1').value;
    let mas2 = document.getElementById('id_mas2').value;
    let strError = '';
    mas1 = mas1.split(' ');
    mas2 = mas2.split(' ');

    if (!validateElement(mas1)) {
        strError +=
            'Ошибка в элементах множества <br>Они не должны повторяться <br>и должны входить в диапозон (0 - 9)<br>';
    } else {
        for (let i = 0; i < mas2.length; i++) {
            if (!validateRelation(mas1, mas2[i])) strError += 'Ошибка в ' + (i + 1) + ' отношении';
        }
    }

    if (strError === '') {
        document.getElementById('result').innerHTML =
            'Рефлексивность: ' + reflect(mas1, mas2) + '<br>';
        document.getElementById('result').innerHTML += 
            'Симметричность: ' + symmetry(mas2) + '<br>';
        document.getElementById('result').innerHTML +=
            'Кососимметричность: ' + skewSymmetry(mas2) + '<br>';
        document.getElementById('result').innerHTML +=
            'Транзитивность: ' + transitivity(mas2) + '<br>';
    } else {
        document.getElementById('result').innerHTML = strError;
    }
}