// Expected: 1, 2, 4, 3
// Пояснення: 
// 1. Спочатку повністю вичищається черга nextTick: виводить '1'.
// 2. Далі починає виконуватися черга Promise (мікротаски). Перший Promise виводить '2', додає новий nextTick ('3') і додає ще один Promise ('4') у ту саму чергу Promise.
// 3. Node продовжує виконувати чергу Promise ДО КІНЦЯ, тому далі виконається "вкладений" Promise, і він виведе '4'.
// 4. Тільки коли черга Promise стане порожньою, Node подивиться, чи з'явились нові nextTick. Там є '3', і він його виведе.

process.nextTick(() => {
    console.log('1'); // 1
});

Promise.resolve().then(() => {
    console.log('2'); // 2
    process.nextTick(() => {
        console.log('3'); // 4
    });
    Promise.resolve().then(() => {
        console.log('4'); // 3
    });
});
