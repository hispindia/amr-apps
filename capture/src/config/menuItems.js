export const menuItems = {
    items: [
        {
            label: 'My records (0)',
            value: '/approval/ALL',
            icon: 'home',
            status: 'ALL',
        },
        {
            label: 'Records for revision (0)',
            value: '/approval/Resend',
            icon: 'error_outline',
            status: 'Resend',
        },
        {
            label: 'Rejected records (0)',
            value: '/approval/Rejected',
            icon: 'highlight_off',
            status: 'Rejected',
        },
        {
            label: 'Accepted records (0)',
            value: '/approval/Approved',
            icon: 'check_circle_outline',
            status: 'Approved',
        },
        {
            label: 'Records for validation (0)',
            value: '/approval/Validate',
            icon: 'help_outline',
            status: 'Validate',
        },
    ],
    userOnly: true,
}
