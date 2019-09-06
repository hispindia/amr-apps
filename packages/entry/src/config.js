export const developmentServer = 'https://amrtest.icmr.org.in/amr'

export const appName = 'Data Entry'

export const categories = [
    {
        label: 'My records',
        value: '#/approval/ALL',
        icon: 'home',
        status: 'ALL',
        sqlViews: {
            count: 'odg5FpAc79x',
            table: 'gPZgVJOeHk4',
        },
        count: 0,
        color: 'primary',
    },
    {
        label: 'Records for revision',
        value: '#/approval/Resend',
        icon: 'error_outline',
        status: 'Resend',
        sqlViews: {
            count: 'xFyCgPnxGHg',
            table: 'n5VaREaQ7aa',
        },
        count: 0,
        param: true,
        color: 'yellow',
    },
    {
        label: 'Rejected records',
        value: '#/approval/Rejected',
        icon: 'highlight_off',
        status: 'Rejected',
        sqlViews: {
            count: 'UUTmMThacVx',
            table: 'F5n8ZowsJB5',
        },
        count: 0,
        param: true,
        color: 'red',
    },
    {
        label: 'Accepted records',
        value: '#/approval/Approved',
        icon: 'check_circle_outline',
        status: 'Approved',
        sqlViews: {
            count: 'FHBxLVMynGb',
            table: 'NpHoZ0PCGNY',
        },
        count: 0,
        param: true,
        color: 'green',
    },
    {
        label: 'Records for validation',
        value: '#/approval/Validate',
        icon: 'help_outline',
        status: 'Validate',
        sqlViews: {
            count: 'Xraki4mz5B8',
            table: 'k4Or0pHTmPN',
        },
        count: 0,
        color: 'black',
    },
    {
        label: 'Incomplete records',
        value: '#/approval/Incomplete',
        icon: 'pause_circle_outline',
        status: 'Incomplete',
        sqlViews: {
            count: 'NmiQ8wvL2fD',
            table: 'nwO7eOjAqmu',
        },
        count: 0,
        color: 'black',
    },
]