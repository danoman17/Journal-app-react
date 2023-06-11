import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui/';
import { useCheckAuth } from '../hooks';

export const AppRouter = () => {

    // we acces to status value with useCheckAuth
    const { status } = useCheckAuth();

    // if we're checking the user status, we display loading anim
    if( status === 'checking' )
    {
        return <CheckingAuth />
    }

    // if we are whether authenticated or not-authenticated, we show these routes
    return (
        <Routes>
            {/* If we are auth we go to Journal routes if not, we go to auth routes */}
            {
                (status === 'authenticated')
                ? <Route path="/*" element={ <JournalRoutes /> } />
                : <Route path="/auth/*" element={ <AuthRoutes /> } />
            }

            {/* if we're not auth or not-auth */}
            <Route path='/*' element={ <Navigate to='/auth/login'/> } />
        </Routes>
    )
}
