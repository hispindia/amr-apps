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
            tableView: {
                l1: 'd1gMq0frCpA',
                l2: 'COjhfA8oF1s',
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
            tableView: {
                l1: 'Zfd5ceEo2Pw',
                l2: 'rszxQdl3Yve',
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
            tableView: {
                l1: 'Zfd5ceEo2Pw',
                l2: 'rszxQdl3Yve',
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
            tableView: {
                l1: 'Zfd5ceEo2Pw',
                l2: 'rszxQdl3Yve',
            },
            count: 0,
            param: true,
        },
    ],
    userOnly: false,
}
