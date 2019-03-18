export const menuItems = {
    items: [
        {
            label: 'Records for validation (0)',
            value: '/approval/Validate',
            icon: 'home',
            status: 'Validate',
            countView: {
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
            countView: {
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
            countView: {
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
            countView: {
                l1: 'mt0ZHD3tRGm',
                l2: 'GZIcSClZOBR',
            },
            count: 0,
            param: true,
        },
        {
            label: 'Incomplete records (0)',
            value: '/approval/Incomplete',
            icon: 'pause_circle_outline',
            status: 'Incomplete',
            countView: {
                l1: 'BysSuraaLB4',
                l2: 'vc0KxMgXdHT',
            },
            count: 0,
        },
    ],
    userOnly: false,
}
