import fs from 'fs';
import path from 'path';

const filePath = path.resolve("Utils/userData.json");

export function getLatestUser() {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return users[users.length - 1];
}

export function updateLatestUserPassword(newPassword) {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    users[users.length - 1].password = newPassword;
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
}
