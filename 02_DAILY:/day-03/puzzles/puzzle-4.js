// Expected: 1, 2, 3, 4
// Пояснення:
// У Node.js > 11 Event Loop виконує мікротаски (nextTick, Promise) між виконанням КОЖНОЇ окремої макротаски з черги!
// - Першою виконується макротаска setTimeout (виводить '1').
// - Вона ж реєструє нову мікротаску nextTick ('2') та Promise ('3').
// - Event Loop тимчасово зупиняється і ОДРАЗУ виконує ці мікротаски: '2', потім '3'.
// - Лише після того, як всі мікротаски порожні, Event Loop переходить до наступної макротаски: другого setTimeout (виведе '4').

setTimeout(() => {
    console.log('1'); // 1
    process.nextTick(() => console.log('2')); // 2
    Promise.resolve().then(() => console.log('3')); // 3
}, 0);

setTimeout(() => {
    console.log('4'); // 4
}, 0);
