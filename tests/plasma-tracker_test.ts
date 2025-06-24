import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.4.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
  name: "Plasma Tracker: Registration and Basic Operations",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;

    // Test registering a plasma institution
    let block = chain.mineBlock([
      Tx.contractCall('plasma-tracker', 'register-institution', [
        types.ascii('Global Plasma Solutions'),
        types.ascii('Financial Services')
      ], deployer.address)
    ]);

    assertEquals(block.receipts[0].result, 'true');
  }
});

Clarinet.test({
  name: "Plasma Tracker: Transaction Recording",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const deployer = accounts.get('deployer')!;
    const wallet1 = accounts.get('wallet_1')!;

    // Test recording a plasma transaction
    let block = chain.mineBlock([
      Tx.contractCall('plasma-tracker', 'record-transaction', [
        types.uint(1000),
        types.ascii('USD'),
        types.ascii('TRANSFER'),
        types.ascii('Security Transaction')
      ], deployer.address)
    ]);

    assertEquals(block.receipts[0].result, 'true');
  }
});