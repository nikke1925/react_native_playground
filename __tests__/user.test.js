// @flow
import User from '../src/jest_sample/User';

test('ユーザーはID、名前、年齢をもつ', () => {
  const user = new User({ id: 1, name: 'なまえ', age: 30 });
  expect(user.id).toBe(1);
  expect(user.name).toBe('なまえ');
  expect(user.age).toBe(30);
});

test('ユーザーデータを登録できる', () => {
  const user = new User({ id: 1, name: 'なまえ', age: 30 });
  expect(user.save()).toBe(user);
});
