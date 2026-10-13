// Задание 2. Карточка пользователя (15 минут)
//
// 1. Реализуйте describeUser.
// 2. Отсутствующий возраст не должен превращаться в "undefined лет".
// 3. Контакт различайте оператором in, а не проверкой на undefined.
// 4. Пустой массив хобби обработайте отдельной фразой.
//
// Без any, as и !.

export type Contact = { email: string } | { phone: string };

export type User = {
    name: string;
    age?: number;
    hobbies: string[];
    contact: Contact;
};

export function describeUser(user: User): string {
    const agePart = user.age !== undefined
        ? `Возраст: ${user.age}.`
        : "Возраст не указан.";

    const hobbiesPart = user.hobbies.length === 0
        ? "Хобби нет."
        : `Хобби: ${user.hobbies.join(", ")}.`;

    const contactPart = "email" in user.contact
        ? `Email: ${user.contact.email}`
        : `Телефон: ${user.contact.phone}`;

    return `${user.name}. ${agePart} ${hobbiesPart}\n${contactPart}`;
}