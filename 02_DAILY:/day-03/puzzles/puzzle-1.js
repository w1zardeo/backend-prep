// Expected: 1, 5, 4, 3, 2
// Пояснення: 
// Синхронний код виконується першим (1, 5).
// Потім перевіряються мікротаски, причому nextTick має вищий пріоритет за Promise (отже: 4, потім 3).
// В кінці виконується макротаска setTimeout (2).

console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
process.nextTick(() => console.log('4'));
console.log('5');
