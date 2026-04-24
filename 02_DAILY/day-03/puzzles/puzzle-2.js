// Expected: 3, 1, 4, 2
// Пояснення:
// 1. Реєструються Promise 1 та nextTick 3.
// 2. Черга nextTick виконується завжди першою ПОВНІСТЮ: виводиться '3', додається Promise 4.
// 3. Починає виконуватися черга Promise (там зараз лежать 1 та 4). Виконується перший Promise, виводить '1' і додає nextTick 2.
// 4. Оскільки черга Promise повинна відпрацювати до кінця, перш ніж знову перевірити nextTick, виконується Promise 4.
// 5. Обидві черги мікротасок стають порожніми, але під час їх роботи з'явився новий nextTick 2. Він виводиться останнім!

Promise.resolve().then(() => {
    console.log('1'); // 2
    process.nextTick(() => console.log('2')); // 4
});

process.nextTick(() => {
    console.log('3'); // 1
    Promise.resolve().then(() => console.log('4')); // 3
});
