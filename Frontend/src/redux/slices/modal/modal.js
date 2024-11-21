import { createSlice, combineReducers } from "@reduxjs/toolkit";

const SuccessModalSlice = createSlice({
  name: "successModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleSuccessModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});

const AddPondModalSlice = createSlice({
  name: "addPondModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleAddPondModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const UpdatePondModalSlice = createSlice({
  name: "updatePondModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleUpdatePondModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const DelPondModalSlice = createSlice({
  name: "delPondModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleDelPondModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const UpdateWaterModalSlice = createSlice({
  name: "updateWaterModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleUpdateWaterModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const AddKoiModalSlice = createSlice({
  name: "addKoiModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleAddKoiModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const UpdateKoiModalSlice = createSlice({
  name: "updateKoiModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleUpdateKoiModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const DelKoiModalSlice = createSlice({
  name: "delKoiModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleDelKoiModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const DetailKoiModalSlice = createSlice({
  name: "detailKoiModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleDetailKoiModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
    toggleDetailKoiModalOff: (state) => {
      state.isToggleModal = false;
    },
  },
});
const KoiHistoryModalSlice = createSlice({
  name: "koiHistoryModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleKoiHistoryModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
    toggleKoiHistoryOn: (state) => {
      state.isToggleModal = true;
    },
    toggleKoiHistoryOff: (state) => {
      state.isToggleModal = false;
    },
  },
});
const CancelMyOrderModalSlice = createSlice({
  name: "cancelMyOrderModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleCancelMyOrderModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const AddBlogModalSlice = createSlice({
  name: "addBlogModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleAddBlogModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const UpdateBlogModalSlice = createSlice({
  name: "updateBlogModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleUpdateBlogModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const DeleteBlogModalSlice = createSlice({
  name: "deleteBlogModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleDeleteBlogModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const AddProductModalSlice = createSlice({
  name: "addProductModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleAddProductModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const UpdateProductModalSlice = createSlice({
  name: "updateProductModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleUpdateProductModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const DeleteProductModalSlice = createSlice({
  name: "deleteProductModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleDeleteProductModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const DeleteAccountModalSlice = createSlice({
  name: "deleteAccountModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleDeleteAccountModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const AddKoiLogModalSlice = createSlice({
  name: "addKoiLogModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleKoiLogModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
const AddAccountModalSlice = createSlice({
  name: "addAccountModal",
  initialState: { isToggleModal: false },
  reducers: {
    toggleAccountModal: (state) => {
      state.isToggleModal = !state.isToggleModal;
    },
  },
});
// Export the action
export const { toggleSuccessModal } = SuccessModalSlice.actions;
export const { toggleAddPondModal } = AddPondModalSlice.actions;
export const { toggleUpdatePondModal } = UpdatePondModalSlice.actions;
export const { toggleDelPondModal } = DelPondModalSlice.actions;
export const { toggleUpdateWaterModal } = UpdateWaterModalSlice.actions;
export const { toggleAddKoiModal } = AddKoiModalSlice.actions;
export const { toggleUpdateKoiModal } = UpdateKoiModalSlice.actions;
export const { toggleDelKoiModal } = DelKoiModalSlice.actions;
export const { toggleDetailKoiModal } = DetailKoiModalSlice.actions;
export const { toggleDetailKoiModalOff } = DetailKoiModalSlice.actions;
export const { toggleKoiHistoryModal } = KoiHistoryModalSlice.actions;
export const { toggleKoiHistoryOn } = KoiHistoryModalSlice.actions;
export const { toggleKoiHistoryOff } = KoiHistoryModalSlice.actions;
export const { toggleCancelMyOrderModal } = CancelMyOrderModalSlice.actions;
export const { toggleAddBlogModal } = AddBlogModalSlice.actions;
export const { toggleUpdateBlogModal } = UpdateBlogModalSlice.actions;
export const { toggleDeleteBlogModal } = DeleteBlogModalSlice.actions;
export const { toggleAddProductModal } = AddProductModalSlice.actions;
export const { toggleUpdateProductModal } = UpdateProductModalSlice.actions;
export const { toggleDeleteProductModal } = DeleteProductModalSlice.actions;
export const { toggleKoiLogModal } = AddKoiLogModalSlice.actions;
export const { toggleDeleteAccountModal } = DeleteAccountModalSlice.actions;
export const { toggleAccountModal } = AddAccountModalSlice.actions;

// Combine reducers
const ModalReducer = combineReducers({
  successModal: SuccessModalSlice.reducer,
  addPondModal: AddPondModalSlice.reducer,
  updatePondModal: UpdatePondModalSlice.reducer,
  delPondModal: DelPondModalSlice.reducer,
  updateWaterModal: UpdateWaterModalSlice.reducer,
  addKoiModal: AddKoiModalSlice.reducer,
  updateKoiModal: UpdateKoiModalSlice.reducer,
  delKoiModal: DelKoiModalSlice.reducer,
  detailKoiModal: DetailKoiModalSlice.reducer,
  koiHistoryModal: KoiHistoryModalSlice.reducer,
  cancelMyOrderModal: CancelMyOrderModalSlice.reducer,
  addBlogModal: AddBlogModalSlice.reducer,
  updateBlogModal: UpdateBlogModalSlice.reducer,
  deleteBlogModal: DeleteBlogModalSlice.reducer,
  addProductModal: AddProductModalSlice.reducer,
  updateProductModal: UpdateProductModalSlice.reducer,
  deleteProductModal: DeleteProductModalSlice.reducer,
  addKoiLogModal: AddKoiLogModalSlice.reducer,
  deleteAccountModal: DeleteAccountModalSlice.reducer,
  addAccountModal: AddAccountModalSlice.reducer,
});

export default ModalReducer;
