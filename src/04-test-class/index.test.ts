import { BankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError } from "./index";

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = new BankAccount(300);
    expect(account.getBalance()).toBe(300);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = new BankAccount(50);
    expect(() => account.withdraw(100)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = new BankAccount(100);
    const account2 = new BankAccount(50);
    expect(() => account1.transfer(600, account2)).toThrowError(InsufficientFundsError);
    });

  test('should throw error when transferring to the same account', () => {
    const account = new BankAccount(100);
    expect(() => account.transfer(30, account)).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = new BankAccount(200);
    account.deposit(50);
    expect(account.getBalance()).toBe(250);
  });

  test('should withdraw money', () => {
    const account = new BankAccount(200);
    account.withdraw(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should transfer money', () => {
    const account1 = new BankAccount(100);
    const account2 = new BankAccount(50);
    account1.transfer(30, account2);
    expect(account1.getBalance()).toBe(70);
    expect(account2.getBalance()).toBe(80);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = new BankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(75);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
    expect(balance).toBe(75);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(75);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(75);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrowError(SynchronizationFailedError);
  });
});
