export const menuItems = [
    {
        label: 'My records',
        value: '/',
        icon: 'home',
    },
    {
        label: 'Records for revision (0)',
        value: '/events/Resend/',
        icon: 'error_outline',
        status: 'Resend',
    },
    {
        label: 'Rejected records (0)',
        value: '/events/Rejected/',
        icon: 'highlight_off',
        status: 'Rejected',
    },
    {
        label: 'Accepted records (0)',
        value: '/events/Approved/',
        icon: 'check_circle_outline',
        status: 'Approved',
    },
    {
        label: 'Records for validation (0)',
        value: '/events/Validate/',
        icon: 'help_outline',
        status: 'Validate',
    },
]
