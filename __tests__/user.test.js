// @flow
import User from '../src/jest_sample/User';

const initializeDB = () => {
  User.clearUsers();
};

beforeEach(() => {
  initializeDB();
});

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

test('ユーザーが年齢で検索できる', () => {
  new User({ id: 1, name: 'なまえ1', age: 30 }).save();
  new User({ id: 2, name: 'なまえ2', age: 20 }).save();

  const searchUsers = User.search({ age: 30 });

  expect(searchUsers.length).toBe(1);
  expect(searchUsers.filter((user) => user.age === 30).length).toBe(1);
});

test('0 歳児のユーザを検索できる', () => {
  new User({ id: 1, name: 'なまえ1', age: 30 }).save();
  new User({ id: 2, name: 'なまえ2', age: 20 }).save();
  new User({ id: 3, name: '0歳児', age: 0 }).save();

  const searchUsers = User.search({ age: 0 });

  expect(searchUsers.length).toBe(1);
  expect(searchUsers.filter((user) => user.age === 0).length).toBe(1);
});

test('ユーザーが名前で検索できる', () => {
  new User({ id: 1, name: 'なまえ1', age: 30 }).save();
  new User({ id: 2, name: 'なまえ2', age: 20 }).save();

  const searchUsers = User.search({ name: 'なまえ1' });

  expect(searchUsers.length).toBe(1);
  expect(searchUsers.filter((user) => user.name === 'なまえ1').length).toBe(1);
});

test('ユーザーが年齢と名前で検索できる', () => {
  new User({ id: 1, name: 'なまえ1', age: 30 }).save();
  new User({ id: 2, name: 'なまえ2', age: 20 }).save();
  new User({ id: 3, name: 'なまえ1', age: 20 }).save();
  new User({ id: 4, name: 'なまえ4', age: 20 }).save();

  const searchUsers = User.search({ age: 20, name: 'なまえ1' });

  expect(searchUsers.length).toBe(1);
  expect(searchUsers.filter((user) => user.age === 20 && user.name === 'なまえ1').length).toBe(1);
});

test('絞り込みがなければ全件取得', () => {
  new User({ id: 1, name: 'なまえ1', age: 30 }).save();
  new User({ id: 2, name: 'なまえ2', age: 20 }).save();
  new User({ id: 3, name: 'なまえ1', age: 20 }).save();
  new User({ id: 4, name: 'なまえ4', age: 20 }).save();

  const searchUsers = User.search();

  expect(searchUsers.length).toBe(4);
});
