import { jest } from "@jest/globals";
import { faker } from "@faker-js/faker";
import voucherExample from "./factories/voucherFactory";
import voucherService from "../../src/services/voucherService";
import voucherRepository from "../../src/repositories/voucherRepository";

beforeEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe("Test create voucher", () => {
  it("Create valid voucher", async () => {
    const code = faker.random.alpha(6);
    const discount: number = Number(faker.random.numeric(2));

    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {});
    jest
      .spyOn(voucherRepository, "createVoucher")
      .mockImplementationOnce((): any => {});

    await voucherService.createVoucher(code, discount);

    expect(voucherRepository.getVoucherByCode).toBeCalled();
    expect(voucherRepository.createVoucher).toBeCalled();
  });
  it("Repeated voucher error", async () => {
    const discount: number = Number(faker.random.numeric(2));
    const voucher = voucherExample.validVoucherExample();

    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {
        return voucher;
      });
    jest
      .spyOn(voucherRepository, "createVoucher")
      .mockImplementationOnce((): any => {});

    const promise = voucherService.createVoucher(voucher.code, discount);

    expect(promise).rejects.toEqual({
      type: "conflict",
      message: "Voucher already exist.",
    });

    expect(voucherRepository.createVoucher).not.toBeCalled();
  });
});

describe("Test apply voucher", () => {
  it("Use valid voucher", async () => {
    const voucher = voucherExample.validVoucherExample();
    const amount: number = Number(faker.random.numeric(4));

    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {
        return voucher;
      });
    jest
      .spyOn(voucherRepository, "useVoucher")
      .mockImplementationOnce((): any => {});
    const discountInfo = await voucherService.applyVoucher(
      voucher.code,
      amount
    );

    const amountWithDiscount = amount - amount * (voucher.discount / 100);

    expect(voucherRepository.getVoucherByCode).toBeCalled();
    expect(voucherRepository.useVoucher).toBeCalled();
    expect(discountInfo.applied).toEqual(true);
    expect(discountInfo.finalAmount).toEqual(amountWithDiscount);
    expect(discountInfo.amount).toEqual(amount);
    expect(discountInfo.discount).toEqual(voucher.discount);
  });
  it("Voucher does not apply for value", async () => {
    const voucher = voucherExample.validVoucherExample();
    const amount: number = Number(faker.random.numeric(2));

    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {
        return voucher;
      });
    jest
      .spyOn(voucherRepository, "useVoucher")
      .mockImplementationOnce((): any => {});
    const discountInfo = await voucherService.applyVoucher(
      voucher.code,
      amount
    );

    expect(voucherRepository.getVoucherByCode).toBeCalled();
    expect(voucherRepository.useVoucher).not.toBeCalled();
    expect(discountInfo.applied).toEqual(false);
  });
  it("Voucher not found error", async () => {
    const code = faker.random.alphaNumeric(6);
    const amount: number = Number(faker.random.numeric(4));

    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {});
    jest
      .spyOn(voucherRepository, "useVoucher")
      .mockImplementationOnce((): any => {});

    const promise = voucherService.applyVoucher(code, amount);

    expect(voucherRepository.getVoucherByCode).toBeCalled();
    expect(voucherRepository.useVoucher).not.toBeCalled();
    expect(promise).rejects.toEqual({
      type: "conflict",
      message: "Voucher does not exist.",
    });
  });
  it("Used voucher", async () => {
    const usedVoucher = voucherExample.usedVoucher();
    const amount: number = Number(faker.random.numeric(3));
    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockImplementationOnce((): any => {
        return usedVoucher;
      });
    jest
      .spyOn(voucherRepository, "useVoucher")
      .mockImplementationOnce((): any => {});
    const discountInfo = await voucherService.applyVoucher(
      usedVoucher.code,
      amount
    );

    expect(voucherRepository.getVoucherByCode).toBeCalled();
    expect(voucherRepository.useVoucher).not.toBeCalled();
    expect(discountInfo.applied).toEqual(false);
  });
});
