export const config = {
    appName: 'Data Approval',
    isApproval: true,
    categories: [
        {
            label: 'Records for validation (0)',
            value: '/approval/Validate',
            icon: 'home',
            status: 'Validate',
            sqlViews: {
                count: ['RZAP9Bv1bAR', 'oxmXevSi4bN'],
                table: ['d1gMq0frCpA', 'COjhfA8oF1s'],
            },
            count: 0,
        },
        {
            label: 'Records for revision (0)',
            value: '/approval/Resend',
            icon: 'error_outline',
            status: 'Resend',
            sqlViews: {
                count: ['mt0ZHD3tRGm', 'GZIcSClZOBR'],
                table: ['Zfd5ceEo2Pw', 'rszxQdl3Yve'],
            },
            count: 0,
            param: true,
        },
        {
            label: 'Rejected records (0)',
            value: '/approval/Rejected',
            icon: 'highlight_off',
            status: 'Rejected',
            sqlViews: {
                count: ['mt0ZHD3tRGm', 'GZIcSClZOBR'],
                table: ['Zfd5ceEo2Pw', 'rszxQdl3Yve'],
            },
            count: 0,
            param: true,
        },
        {
            label: 'Accepted records (0)',
            value: '/approval/Approved',
            icon: 'check_circle_outline',
            status: 'Approved',
            sqlViews: {
                count: ['mt0ZHD3tRGm', 'GZIcSClZOBR'],
                table: ['Zfd5ceEo2Pw', 'rszxQdl3Yve'],
            },
            count: 0,
            param: true,
        },

        {
            label: 'Incomplete records (0)',
            value: '/approval/Incomplete',
            icon: 'pause_circle_outline',
            status: 'Incomplete',
            sqlViews: {
                count: ['BysSuraaLB4', 'vc0KxMgXdHT'],
                table: ['vgwCVic3G4T', 'V0PVJtu2XZx'],
            },
            count: 0,
        },
    ],
}
