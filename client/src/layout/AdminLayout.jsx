export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { userAutherized } = useSelector((state) => state.user);

  const checkUser = async () => {
    try {
      const response = await axiosInstance({ method: "GET", url: "/admins/check-admin" });
      console.log(response, "====response");
      dispatch(saveUser(response?.data?.data));
    } catch (error) {
      console.log(error?.response?.data, "===error");
      dispatch(clearUser());
    }
  };

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  // Show <Header /> on login page
  const isLoginPage = location.pathname === "/admin/login";

  return (
    <div>
      {isLoginPage ? <Header /> : userAutherized ? <AdminHeader /> : <Header />}

      <div className='min-h-96'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
