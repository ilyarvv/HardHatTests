const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("ILYA Token", function() {
    let ILYA;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function() {
        [owner, addr1, addr2] = await ethers.getSigners();
        
        const ILYATokenContract = await ethers.getContractFactory("ILYAToken");
        ILYA = await ILYATokenContract.deploy();
    });
    

    it("Should have the correct name, symbol, and initial supply", async function() {
        // Проверка имени токена
        expect(await ILYA.name()).to.equal("ILYA");

        // Проверка символа токена
        expect(await ILYA.symbol()).to.equal("ILYA");

        // Проверка начального количества токенов
        const initialSupply = BigInt(100) * BigInt(10 ** await ILYA.decimals());
        expect(await ILYA.totalSupply()).to.equal(initialSupply);

        // Проверка баланса у владельца контракта
        expect(await ILYA.balanceOf(owner.address)).to.equal(initialSupply);

        // Проверка баланса у других адресов
        expect(await ILYA.balanceOf(addr1.address)).to.equal(0);
        expect(await ILYA.balanceOf(addr2.address)).to.equal(0);
    });

    it("Should transfer tokens correctly", async function() {
        // Передача токенов от владельца контракта к addr1
        const transferAmount = ethers.utils.parseUnits("10", await ILYA.decimals());
        await ILYA.transfer(addr1.address, transferAmount);

        // Проверка баланса после передачи
        expect(await ILYA.balanceOf(owner.address)).to.equal(90 * 10**await ILYA.decimals());
        expect(await ILYA.balanceOf(addr1.address)).to.equal(transferAmount);
    });
});
