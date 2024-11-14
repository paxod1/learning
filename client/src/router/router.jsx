import { createBrowserRouter} from "react-router-dom";
import { UserLayout } from "../layout/UserLayout";
import { ErrorPage } from "../pages/user/ErrorPage";
import { About } from "../pages/user/About";
import { Contact } from "../pages/user/Contact";
import { Course } from "../pages/user/Course";
import { CourseDetails } from "../pages/user/CourseDetails";
import { Home } from "../pages/user/Home";
import { LoginPage } from "../pages/shared/LoginPage";
import { ProtectRoute } from "./ProtectRoute";
import { Profile } from "../pages/user/Profile";
import { Cart } from "../pages/user/Cart";
import { SignupPage } from "../pages/shared/SignupPage";
import { MentorLayout } from "../layout/MentorLayout";
import { MentorProfile } from "../pages/mentor/Profile";
import { MentorAbout } from "../pages/mentor/MentorAbout";
import { MentorContact } from "../pages/mentor/MentorContact";
import { MentorHome } from "../pages/mentor/MentorHome";


 export const router = createBrowserRouter([
    {
      path: "",
      element: <UserLayout />,
      errorElement: <ErrorPage/>,
      children: [
        { 
          path: "signup",
          element: <SignupPage />
        },
        { 
          path: "login",
          element: <LoginPage />,

        },
        { 
            path: "",
            element: <Home />,

        },
        { 
            path: "about",
            element: <About />,

        },
        { 
            path: "contact",
            element: <Contact />,

        },
        { 
            path: "course",
            element: <Course />,

        },
        { 
            path: "course-details/:id",
            element: <CourseDetails />,

        },
       {
            path:'user',
            element: <ProtectRoute />,
            children: [
              {
                path: "profile",
                element: <Profile/>,
              },
              {
                path: 'cart',
                element: <Cart />
              },
              {
                path: 'wishlist',
                element: <h2>User Wishlist</h2>
              },
              {
                path: 'orders',
                element: <h2>User Orders</h2>
              },
              {
                path:"payment/success",
                element: <h2>Payment success</h2>
              },
              {
                path:"payment/cancel",
                element: <h2>Payment cancelled</h2>
              }
              
        ]
       }
       
      ],
    },
    {
      path: "mentor",
      element: <MentorLayout />,
      children: [
          {
              path: "signup",
              element: <SignupPage />,
          },
          {
              path: "login",
              element: <LoginPage role="mentor" />,
          },
          { 
            path: "",
            element: <MentorHome />,

          },
          { 
            path: "about",
            element: <MentorAbout />,

          },
          { 
            path: "contact",
            element: <MentorContact />,

          },
          { 
            path: "course",
            element: <Course />,

          },
          { 
            path: "course-details/:id",
            element: <CourseDetails />,

          },

          {
              path: "",
              element: <ProtectRoute />,
              children: [
                  {
                      path: "profile",
                      element: <MentorProfile />
                  },
                  
              ],
          },
      ],
  },
]);