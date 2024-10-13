import React from "react";
import { IC_Delete } from "../../assets/icons";
import { useDeleteTestPlanMutation } from "../../features/dashboard/dashboardAPI";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";
import Button from "../../components/Button";
const DeleteTestPlanModal = ({ onDeleteSuccess, bucketItem }) => {
  const [deleteTestPlan] = useDeleteTestPlanMutation();
  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    const payload = { tpId: bucketItem?.tpId };
    try {
      const deleteRes = await deleteTestPlan(payload).unwrap();
      onDeleteSuccess();
      if (deleteRes.status === 200) {
        dispatch(dishNetworkApi.util.invalidateTags(["testPlanList"]));
        toast.success(deleteRes.message);
      } else {
        toast.error(deleteRes.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || "test plan not deleted");
    }
  };

  return (
    <div
      data-testid="logoutModal"
      className="flex flex-col justify-center p-1 text-center md:p-2"
    >
      <IC_Delete className="mx-auto mb-2 h-8 w-8 text-coral" />

      <div className="mt-1 flex w-full justify-center text-center text-xl font-medium text-theme-black  ">
        <p>Are you sure?</p>
      </div>
      <p className="mb-4 mt-2 text-xs items-center text-center align-middle text-theme-grey  font-normal leading-5">
        Do you really want to delete this record? 
      </p>
      <div className="flex flex-col justify-center space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
        <Button
          title="Close popup"
          onClick={onDeleteSuccess}
          className="cursor-pointer rounded-md border-[1px] bg-white p-1 text-xs font-normal text-theme-black"
        >
          Cancel
        </Button>
        <Button
          title="Decline"
          onClick={handleDelete}
          className="cursor-pointer rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteTestPlanModal;