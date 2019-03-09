export const menuItems = {
    items: [
        {
            label: 'Records for validation (0)',
            value: '/approval/Validate',
            icon: 'home',
            status: 'Validate',
            sqlView: {
                l1: 'RZAP9Bv1bAR',
                l2: 'oxmXevSi4bN',
            },
            count: 0,
        },
        {
            label: 'Records for revision (0)',
            value: '/approval/Resend',
            icon: 'error_outline',
            status: 'Resend',
            sqlView: {
                l1: 'mt0ZHD3tRGm',
                l2: 'GZIcSClZOBR',
            },
            count: 0,
            param: true,
        },
        {
            label: 'Rejected records (0)',
            value: '/approval/Rejected',
            icon: 'highlight_off',
            status: 'Rejected',
            sqlView: {
                l1: 'mt0ZHD3tRGm',
                l2: 'GZIcSClZOBR',
            },
            count: 0,
            param: true,
        },
        {
            label: 'Accepted records (0)',
            value: '/approval/Approved',
            icon: 'check_circle_outline',
            status: 'Approved',
            sqlView: {
                l1: 'mt0ZHD3tRGm',
                l2: 'GZIcSClZOBR',
            },
            count: 0,
            param: true,
        },
    ],
    userOnly: false,
}
