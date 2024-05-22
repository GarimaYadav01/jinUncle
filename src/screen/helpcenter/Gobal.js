let globalState = {
    addressId: null,
};

export const setAddressId = (id) => {
    globalState.addressId = id;
};

export const getAddressId = () => {
    return globalState.addressId;
};
