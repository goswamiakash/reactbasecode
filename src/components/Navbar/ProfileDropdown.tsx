import { useCallback, useRef, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "../../Router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  ArrowDownIcon,
  LogoutIcon,
  UserIcon,
  NotificationIcon,
  DropDownIcon,
  IV_N_MOB,
  IV_GREEN_INDICATOR,
} from "../../assets/icons";
import { useGetProfileMutation, useLogoutMutation ,UserInfo} from "../../features/auth/authAPI";
import { LOCALAUTH, selectAuthToken, setCredentials } from "../../features/auth/authSlice";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { CircleLoader } from "../Loader";
import Modal from "../Modal";
// import { useGetProfileQuery } from '../../features/profile/profileAPI';
import { removeLocalTime } from "../../hooks/useIdleTimer";
import { twMerge } from "tailwind-merge";
import UserProfileModal from "./UserProfileModal";


//profile dropdown component with logout and my profile feature
const ProfileDropdown = ({ userData }: { userData: UserInfo }) => {

  const profileRef = useRef(null);
  const navigate = useNavigate();
  const [isProfileVisible, setProfileVisible] = useState(false);
  const [isVisibleNotification, setNotificationVisible] = useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAuthToken)
  const [logout, { isLoading }] = useLogoutMutation();
  const [logoutModal, setLogoutModal] = useState(false);
  const [userProfileModal, setUserProfileModal] = useState(false);

const profileImgData = 'exampleImageData';
const [getProfile, { isLoading: isLoadingProfile, data}] = useGetProfileMutation();


// Call the mutation
useEffect(() => {
  //getProfile({ profileImgData });
}, [profileImgData, getProfile]);




  const logoutAction = useCallback(() => {
    removeLocalTime();
    
    //localStorage.clear();
    dispatch(setCredentials({ user: null, token: null }));
    navigate(ROUTES.LOGIN, { replace: true });
  }, []);
  const handleLogout = async () => {
    if (!userData?.email) {
      toast.error("Email is required please login again");
      logoutAction();
      return;
    }
    try {
      const logoutRes = await logout({ email: userData?.email, token }).unwrap();
      localStorage.removeItem(LOCALAUTH.USER);
      localStorage.removeItem(LOCALAUTH.ISAUTH);
      if (logoutRes?.status === 200) {
        logoutAction();
        toast.success(logoutRes?.message);
        return;
      }
      if (logoutRes?.status === 404) {
        logoutAction();
        toast.success("Logout successful");
      } else {
        toast.error(logoutRes?.message);
      }
    } catch (err: any) {
      toast.success("Logout successful");
    }
    logoutAction();
  };
  useOnClickOutside(profileRef, () => {
    setProfileVisible(false);
    setNotificationVisible(false);
  });
  const handleLogoutModalClose = useCallback(() => {
    setLogoutModal(false);
  }, []);

  const handleUserProfileModalClose = useCallback(() => {
    setUserProfileModal(false);
  }, []);

  const gotoNotificationList = () => {
    setNotificationVisible(false);
    navigate(ROUTES.NOTIFICATIONS_DETAILS, { replace: true });
  };

  const notificationList = [
    {
      title: "Lorem Ipsum is simply dummy ",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      title: "Lorem Ipsum is simply dummy ",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      title: "Lorem Ipsum is simply dummy ",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      title: "Lorem Ipsum is simply dummy ",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      title: "Lorem Ipsum is simply dummy ",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];

  return (
    <div data-testid="ProfileDropdown">
      <div className="relative flex items-center gap-3" ref={profileRef}>
        {/* <div className="cursor-pointer font-poppins_cf text-xs text-theme-grey">
          Documentation
        </div> */}

        {/* <div className="cursor-pointer font-poppins_cf text-xs text-theme-grey">
          Help
        </div> */}

        {/* <div className=" h-8 border-r"></div>
        <div className="  flex items-center   justify-start">
          <button
            role="menu"
            title={
              isVisibleNotification ? "Close profile menu" : "Open profile menu"
            }
            className="md:border-1 focus:outline-blue-medium mt-1 flex cursor-pointer items-center p-0 text-sm text-gray-dark  dark:bg-gray-800 sm:flex-col md:mt-0 md:flex-row md:space-x-8 md:bg-white md:px-4 md:py-0 md:text-sm  md:font-medium md:dark:bg-gray-900 "
            onClick={() => setNotificationVisible((b) => !b)}
          >
            <div className="flex items-center">
              <div className=" flex  cursor-pointer items-center justify-center ">
                <NotificationIcon />
              </div>
            </div>
          </button>

          <div
            data-testid="profileMenuList"
            onClick={(e) => e.stopPropagation()}
            className={twMerge(
              "absolute -left-20 top-11 w-max cursor-default border border-gray-200 bg-white p-4  py-2 text-sm font-medium text-gray-900 shadow-lg dark:border-gray-600  dark:bg-gray-700 dark:text-white md:top-14",
              isVisibleNotification ? "block" : "hidden"
            )}
          >
            <div className=" flex justify-between py-2">
              <div className="font-poppins_cf text-base text-theme-black">
                Notifications
              </div>

              <div className="font-poppins_cf text-xs text-theme-dark">
                Mark all as read
              </div>
            </div>

            {notificationList.map((item,index) => (
              <div className="flex " key={index}>
                <div className="mr-2">
                  <IV_N_MOB />
                </div>
                <div className="flex flex-col gap-1 ">
                  <div className="flex items-center gap-2">
                    <div className="font-poppins_cf text-xs font-medium text-theme-black">
                      Lorem Ipsum is simply dummy
                    </div>
                  </div>
                  <div className="font-poppins_cf text-[10px] font-normal text-theme-grey">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </div>

                  <div className="flex gap-2">
                    <div className="font-poppins_cf text-[10px] font-normal text-[#B9B4B4]">
                      12/03/2024
                    </div>
                    <div className="flex items-center gap-2">
                      <IV_GREEN_INDICATOR />
                      <div className=" font-poppins_cf text-[10px] text-xs text-theme-green">
                        New
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div
              className="cursor-pointer items-center py-2 text-center font-poppins_cf text-xs text-theme-dark underline"
              onClick={gotoNotificationList}
            >
              View All
            </div>
          </div>
        </div> */}
        <div
          title="Data Last connectivity"
          className=" my-auto hidden items-center justify-start  gap-1 font-bold sm:inline-flex"
        >
          <div className="flex h-full  truncate">
            <div className="text-xs text-black">
              <UserIcon  onClick={() => setUserProfileModal(true)}/>
            </div>
            <div className="mx-2">
              <div className="text-xs font-normal font-poppins_cf text-theme-black">{userData?.userName}</div>
              <div className="text-sm font-normal font-poppins_cf text-theme-dark">{userData?.userType}</div>
            </div>
          </div>
        </div>

        <button
          role="menu"
          title={isProfileVisible ? "Close profile menu" : "Open profile menu"}
          className="md:border-1 focus:outline-blue-medium mt-1 flex cursor-pointer items-center p-0 text-sm text-gray-dark  dark:bg-gray-800 sm:flex-col md:mt-0 md:flex-row md:space-x-8 md:bg-white md:px-4 md:py-0 md:text-sm  md:font-medium md:dark:bg-gray-900 "
          onClick={() => setProfileVisible((b) => !b)}
        >
          <div className="flex items-center">
            <DropDownIcon
              className={
                "ml-2 w-3 transition-transform" +
                (isProfileVisible ? " rotate-180" : "")
              }
            />
          </div>
        </button>

        <div
          data-testid="profileMenuList"
          onClick={(e) => e.stopPropagation()}
          className={twMerge(
            "absolute right-0 top-11 w-max cursor-default border border-gray-200 bg-white p-4  py-2 text-sm font-medium text-gray-900 shadow-lg dark:border-gray-600  dark:bg-gray-700 dark:text-white md:top-11",
            isProfileVisible ? "block" : "hidden"
          )}
        >
          <button
            onClick={() => setUserProfileModal(true)}
            type="button"
            className="focus:outline-blue-medium focus:ring-blue-light flex w-full cursor-pointer items-center px-2 py-2 text-left font-medium text-gray-500 hover:text-blue-700 focus:ring-2 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500"
          >
            <span className="ml-2">Edit Profile</span>
          </button>
          <hr></hr>

          <button
            onClick={() => setLogoutModal(true)}
            type="button"
            className="focus:outline-blue-medium focus:ring-blue-light flex w-full cursor-pointer items-center px-2  py-2  text-left font-medium text-gray-500 hover:text-blue-700   focus:ring-2 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500"
          >
            {isLoading ? (
              <>
                <CircleLoader className="!mr-2 h-3 w-3 !text-gray-dark" />
                Logging out...
              </>
            ) : (
              <>
                <span className="ml-2"> Log Out</span>
              </>
            )}
          </button>
        </div>

        <Modal
          show={logoutModal}
          onClose={handleLogoutModalClose}
          modalClass={"w-[calc(100%-80px)] md:w-auto rounded-md"}
        >
          <div
            data-testid="logoutModal"
            className="flex flex-col justify-center p-1 text-center md:p-2"
          >
            {isLoading ? (
              <CircleLoader className="!mx-auto mb-2 !h-10 !w-10 !text-coral" />
            ) : (
              <LogoutIcon className="mx-auto mb-2 h-10 w-10 text-coral" />
            )}
            <div className="mb-4 mt-1 flex w-full justify-center text-center font-poppins_w text-lg font-medium text-[#03045E]  md:text-2xl">
              <p>You are about to Logout</p>
            </div>
            

            <div className="flex flex-col justify-center space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0">
              <button
                title="Close popup"
                onClick={handleLogoutModalClose}
                className="w-[90px] cursor-pointer border rounded-md bg-white p-1 text-xs font-normal text-theme-black"
              >
                Cancel
              </button>
              <button
               
                disabled={isLoading}
                title="LOGOUT"
                onClick={handleLogout}
                className="w-[90px] cursor-pointer rounded-md bg-theme-dark py-2 text-xs font-normal text-theme-white"
                //className="w-[90px] rounded-md cursor-pointer  bg-theme-dark py-2 text-xs text-white md:text-sm"
              >
                Yes
               
              </button>
            </div>
          </div>
        </Modal>

        <UserProfileModal
          show={userProfileModal}
          title="Profile Photo"
          userData={userData as any || []}
          onClose={handleUserProfileModalClose}
          modalClass={"w-[calc(100%-90px)] md:w-auto rounded-[4px]"}></UserProfileModal>
      </div>
    </div>
  );
};
export default ProfileDropdown;