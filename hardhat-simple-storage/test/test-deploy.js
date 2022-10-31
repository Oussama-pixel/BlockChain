const { ethers } = require("hardhat");
const { expect,assert } = require("chai")

describe('SimpleStorage', () => { 
  let simpleStorageFactory,simpleStorage
    beforeEach(async ()=>{
      simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
      );
      simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Should start with a favorite number of 0",async function(){
      const currentValue = await simpleStorage.retreive();

      const expectedValue = "0";
      assert.equal(currentValue.toString(),expectedValue);
    })
    it("Should update when we call store",async ()=>{
      const expectedValue = "7";
      const transactionResponse = await simpleStorage.store(expectedValue);
      const currentValue = await simpleStorage.retreive()
      assert.equal(currentValue.toString(),expectedValue)
    })
 })