export const menuItems = {
    items: [
        {
            label: 'Records for validation (0)',
            value: '/',
            icon: 'home',
            status: 'Validate',
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
    ],
    userOnly: false,
}