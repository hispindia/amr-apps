export const config = {
    appName: 'Data Entry',
    isApproval: false,
    categories: [
        {
            label: 'My records (0)',
            value: '/approval/ALL',
            icon: 'home',
            status: 'ALL',
            sqlViews: {
                count: ['odg5FpAc79x'],
                table: ['gPZgVJOeHk4'],
            },
            count: 0,
        },
        {
            label: 'Records for revision (0)',
            value: '/approval/Resend',
            icon: 'error_outline',
            status: 'Resend',
            sqlViews: {
                count: ['xFyCgPnxGHg'],
                table: ['n5VaREaQ7aa'],
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
                count: ['UUTmMThacVx'],
                table: ['F5n8ZowsJB5'],
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
                count: ['FHBxLVMynGb'],
                table: ['NpHoZ0PCGNY'],
            },
            count: 0,
            param: true,
        },
        {
            label: 'Records for validation (0)',
            value: '/approval/Validate',
            icon: 'help_outline',
            status: 'Validate',
            sqlViews: {
                count: ['Xraki4mz5B8'],
                table: ['k4Or0pHTmPN'],
            },
            count: 0,
        },
        {
            label: 'Incomplete records (0)',
            value: '/approval/Incomplete',
            icon: 'pause_circle_outline',
            status: 'Incomplete',
            sqlViews: {
                count: ['NmiQ8wvL2fD'],
                table: ['nwO7eOjAqmu'],
            },
            count: 0,
        },
    ],
}
