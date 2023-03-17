function validVoucherExample() {
  return {
    id: 1,
    code: "111aaa",
    discount: 10,
    used: false,
  };
}

function usedVoucher() {
  return {
    id: 2,
    code: "222bbb",
    discount: 20,
    used: true,
  };
}

export default { validVoucherExample, usedVoucher };
