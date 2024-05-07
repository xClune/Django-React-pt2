# Card-Full-Stack

#### Video Demo (CS50 FINAL PROJECT SUBMISSION): <[URL HERE](https://youtu.be/AahIExB0nE0)>

#### Description:

A basic flash card application.
This application was mainly built as an exercise in authentification and my first forray into creating a full stack
application with CRUD functionality.

BACKEND
Built using Django and the Rest Framework. This includes the use of jwt tokens for authentification with djangorestframework-simplejwt.

AUTHENTIFICATION
Application stores user data on registration and supplies access and refresh tokens to user upon login. Access tokens will expire after 30
minutes and be renewed using the refresh token (set to one day), this can be edited in django settings in SIMPLE_JWT.

DATABASE
Application will store user edits (cards, and folders) across sessions and display upon login, sqlite3 was used for database.
Database consists of three models: User, Folder and Note. User is utilised as a foreign key in both Note and Folder in order to display
the correct cards on login.

API
Application relies on rest_framework generics for its views full CRUD functionality has been implemented. These are connected to note and folder url endpoints.

FRONTEND
Built using React.js, TailwindCSS, axios and react-router-dom.

AUTHENTIFICATION
Register page contains a form that will 'post' username and password to database through /api/user/register/ endpoint, it will then redirect the
user to the login page. Login form will then first determine whether username and password exist in database, if successful, it will set the ACCESS_TOKEN and REFRESH_TOKENS in local storage. It will then navigate the user to '/' which has been wrapped in a 'ProtectedRoute' component. Axios was used to attach the retrieved tokens as authorization headers when the user logs in, the 'api' variable created in api.js is used throughout the code and is an axios transform of the pathway to the API created in the backend.

The ProtectedRoute component is used to wrap any page that we want the user to have logged in first. In this case this just refers to the home '/' pathway. This component uses jwtdecoder to parse the access_token (if it exists) and determine if it is expired. If it is expired, the component will then assess the refresh_token for validity, using it to get a new access token if it exists. If both of these fail, the user is denied access to the page.

The frontend is relatively simple, it allows for creation of 'cards' and 'folders'. Using tailwindcss and React states the application has been made quite smooth and responsive. Hover effects, state changes on mouse exit and the like. Application will change to suit viewport and was designed using a 'mobile first' approach as can be seen with media queries throughout and the header changing from buttons to a hamburger menu dropdown on mobile views.

LEVELLING
Levelling was implemented by creating another model in Django for user statistics. These stats are pulled from the backend and displayed by the header component. I wanted to test out the useContext hook so I utilised that for manipulation of the exp and level values before using a function to push them to the backend with a PUT call in updateStats function. Exp will increment on 'Happy Delete' button click until completion and then the progress bar will tick over to the next level which will in turn require more exp.

STYLING
Various CSS effects where used throughout, including some targeting peers and children, such as the effect that moves cards apart on hover. This was my first Tailwind project and wanted to muck around with a few things, gradients, hover effects etc.

FUTURE DEVELOPMENTS:
I would like to further develop this application in a variety of ways, adding further models with interactions between. The front end could also be expanded with the home page representing a hub of sorts and the current home being moved to its own 'notes' page. The bulk of this project was spent in the backend and authentification as it was an area I am weak in and wanted to develop. Though I believe the front end work is quite good as well and I believe I have significantly improved my abilities in responsive design throughout.
