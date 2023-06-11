import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';

export const JournalApp = () => {
    return (
        /* We're setting some base colors */
        <AppTheme>
            {/* we're callign our app router */}
            <AppRouter />

        </AppTheme>
    )
};