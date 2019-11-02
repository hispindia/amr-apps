export const eventRules = [
    {
        name: 'Hide Gentamicin',
        id: 'GEQxVW8pVD9',
        condition:
            "values['SaQe2REkGVw'] == 'PMA' || values['SaQe2REkGVw'] == 'PCE' || values['SaQe2REkGVw']=='SPN' || values['SaQe2REkGVw']=='ABA' || values['SaQe2REkGVw']=='ACA' || values['SaQe2REkGVw']=='ALW' || values['SaQe2REkGVw']=='AC-' || values['SaQe2REkGVw']=='BCE'",
        priority: 1,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'hKYFJd5H2yG',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'FI1TVmmpjh9',
                },
            },
            {
                id: 'duJpV5XENGF',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'HISVzNoIL07',
                },
            },
        ],
    },
    {
        name: 'Hide Nitrofurantoin result',
        id: 'LIrTuWU43hA',
        condition: "values['vRWArSA8urW'] == '' && values['U7nHovss4xK'] == ''",
        priority: 1,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'tcnHmD4Uv8v',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'heyrUXjYYcP',
                },
            },
        ],
    },
    {
        name: 'Hide Cefotaxime result',
        id: 'B9Ifm3WABYq',
        condition: "values['lpWR8ZSa1zC'] == '' && values['uiMdxS6pvHt'] == ''",
        priority: 1,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'OASKMtwMfDY',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'cPYspBpRsuQ',
                },
            },
        ],
    },
    {
        name: 'Hide Cefixime Result',
        id: 'qVMNtUT8J0h',
        condition: "values['YevRvdwsL3o'] == '' && values['OW7Hm6tlWik'] == ''",
        priority: 1,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'hUXqcqEDYRO',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'NvEaW4yvDpz',
                },
            },
        ],
    },
    {
        name: 'Hide Cefoxitin result',
        id: 'oL3mketrmyB',
        condition:
            "values['FVjeBMIIEqn'] == '' && values['luj4jZNXRjB'] == '' ",
        priority: 1,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'v3KmfqYPEXG',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'mQf4Efd5uVE',
                },
            },
        ],
    },
    {
        name: 'Hide Nitrofurantoin result',
        id: 'Ll4kdkB1CXz',
        condition: "values['vRWArSA8urW'] == '' && values['U7nHovss4xK'] == ''",
        priority: 1,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'LRXH0M8bD1y',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'heyrUXjYYcP',
                },
            },
        ],
    },
    {
        name: 'Hide Cefepime result',
        id: 'BXSSNqO9cCZ',
        condition: "values['ComY5zACdjQ'] == '' && values['aTWISEtdC9C'] == ''",
        priority: 1,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'bZ5TrpKJP6K',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'v4Ev47UKraq',
                },
            },
        ],
    },
    {
        name: 'Hide Norfloxacin result',
        id: 'WAbsXgPkGAj',
        condition: "values['y0YzPyfZNwb'] == '' && values['NBHJLVnacXh'] == ''",
        priority: 1,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'ARnHMWK3nej',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 't5F5a4BMy00',
                },
            },
        ],
    },
    {
        name: 'Hide Cefazolin result',
        id: 'Gv7ffOZ6nEn',
        condition: "values['SZJuj0AmGxB'] == '' && values['lQYcD2hTocV'] == ''",
        priority: 1,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 's4O00gygcnV',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'AC3ZDhUyjDX',
                },
            },
        ],
    },
    {
        name: 'Hide Caspofungin result',
        id: 'ayXKP9IsjNH',
        condition: "values['sgzWFcSXWxS'] == '' && values['LC3X7WR4XRQ'] == ''",
        priority: 1,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'rsq59pBTv1C',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'A60TnvW9biK',
                },
            },
        ],
    },
    {
        name: 'Hide Nalidixic acid result',
        id: 'siEIwzH6Yzf',
        condition: "values['yC1igYd2Cnl'] == '' && values['DMb8qoZPnnZ'] == ''",
        priority: 1,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'MXt9ZWHqgsG',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'bgIMdy70X2z',
                },
            },
        ],
    },
    {
        name: 'Hide Ofloxacin Result',
        id: 'Gfbs3QC8vBo',
        condition: "values['wkj0efBvthE'] == ''",
        priority: 1,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'Cts2h9zeIy1',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'UMMQO5G06B8',
                },
            },
        ],
    },
    {
        name: 'Hide Ceftazidime result',
        id: 'QaVrT2OmidL',
        condition: "values['AW75JSOPNZh'] == '' && values['eW0PzKIfMSn'] == ''",
        priority: 1,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'xVumQCyScNs',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'di11o1M6VkO',
                },
            },
        ],
    },
    {
        name: 'Hide Azithromycin result',
        id: 'JkPbRnc7Jje',
        condition: "values['tDf0wEpy9TM'] == '' && values['jxeoAP1naqM'] == ''",
        priority: 1,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'yfWMo4SdFxc',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'MaJBP9K1y79',
                },
            },
        ],
    },
    {
        name: 'Hide Ceftazidime result',
        id: 'PRtbhbsD6cj',
        condition: "values['AW75JSOPNZh'] == '' && values['eW0PzKIfMSn'] == ''",
        priority: 1,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'SluSBTUuRLh',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'di11o1M6VkO',
                },
            },
        ],
    },
    {
        name: 'Hide Oritavancin result',
        id: 'WSjNbwluiGd',
        condition: "values['v4znitWGFyi'] == ''",
        priority: 1,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'djhEpW2KzF2',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'xzsjJxKV4KR',
                },
            },
        ],
    },
    {
        name: 'Hide Ceftriaxone Result',
        id: 'TollRorJmOT',
        condition: "values['VPc74RPVP4K'] == '' && values['OW7Hm6tlWik'] == ''",
        priority: 1,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'A0knfEphJ6P',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'qkje2xBlwAv',
                },
            },
        ],
    },
    {
        name: 'Hide Oritavancin result',
        id: 'jeRd2k0uqk6',
        condition: "values['v4znitWGFyi'] == ''",
        priority: 1,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'yXhHGZeXYuX',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'xzsjJxKV4KR',
                },
            },
        ],
    },
    {
        name: 'Hide Mupirocin High Level result',
        id: 'GaoX8WjkI3O',
        condition:
            "(values['AGX90gKwEP8'] == '' && values['t4gMYpWynRp'] == '')",
        priority: 1,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'qov7s31PXw5',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'EQG0rzJu3Rd',
                },
            },
        ],
    },
    {
        name: 'Hide Oxacillin result',
        id: 'CyUKTsaPMFU',
        condition: "values['Ou3P4jx4uuR'] == '' && values['Al6e3U8AznW'] == ''",
        priority: 1,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'Y1cB9BPnGXG',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'NmcHHrLV0vd',
                },
            },
        ],
    },
    {
        name: 'Hide Minocycline result',
        id: 'f9RPdks5NcM',
        condition: "values['uTDnkccqS9Z'] == '' && values['bBm12emFnsV'] == ''",
        priority: 1,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'Zx62wscc2WL',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'EeQmaEadxbe',
                },
            },
        ],
    },
    {
        name: 'Hide Pefloxacin result',
        id: 'jghIRD52EM6',
        condition: "values['i4LMwZk3svs'] == ''",
        priority: 1,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'knNuATSkbuy',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'osuvYu8PVjw',
                },
            },
        ],
    },
    {
        name: 'Hide Chloramphenicol result',
        id: 'tA4LRPjRYkw',
        condition: "values['jL3eD3wbnot'] == '' && values['gnjCD7h8Dm8'] == ''",
        priority: 1,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'D9Be1Rq3iik',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'zUb9jAQSFn8',
                },
            },
        ],
    },
    {
        name: 'Hide Penicillin result',
        id: 'H4Pr6uKBFek',
        condition: "values['f8Njqj2Flvf'] == '' && values['RFuGg98lXS9'] == ''",
        priority: 1,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'ecEoIfCcr6g',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'r1pTVxwlNcN',
                },
            },
        ],
    },
    {
        name: 'Hide Chloramphenicol result',
        id: 'wyhMkwyz6QV',
        condition: "values['gnjCD7h8Dm8'] == ''",
        priority: 1,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'NzQ6unhPSc2',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'zUb9jAQSFn8',
                },
            },
        ],
    },
    {
        name: 'Hide Piperacillin tazobactam result',
        id: 'SlYY22t9ep4',
        condition:
            "values['LX2UJgFtmhE'] == '' && values['j7Oenm7cXWx'] == '' && values['O6dwlDQhKUS'] == ''",
        priority: 1,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'HGfAZVTRne1',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'cxZhnL2j4AX',
                },
            },
        ],
    },
    {
        name: 'Hide Chloramphenicol Result',
        id: 'sChrK3k8PMj',
        condition: "values['jL3eD3wbnot'] == '' && values['gnjCD7h8Dm8'] == ''",
        priority: 1,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'jg6JpV1PiFa',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'zUb9jAQSFn8',
                },
            },
        ],
    },
    {
        name: 'Hide Piperacillin-tazobactam result',
        id: 'vOXq4Kmompr',
        condition:
            "values['LX2UJgFtmhE'] == '' && values['j7Oenm7cXWx'] == '' && values['O6dwlDQhKUS'] == ''",
        priority: 1,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'E0S2UGI0RPi',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'cxZhnL2j4AX',
                },
            },
        ],
    },
    {
        name: 'Hide Micafungin result',
        id: 'ClKsjXQ5rRh',
        condition: "values['UYgQYMNvpkW'] == ''",
        priority: 1,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'XAaOop97cvN',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'W2IsLxG0Ors',
                },
            },
        ],
    },
    {
        name: 'Hide Posaconazole result',
        id: 'zmtGWd8dfIV',
        condition: "values['rYMrMTYi1EK'] == '' && values['x0cDjIk7FLV'] == ''",
        priority: 1,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'nXuMyHmMlDX',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'iC1I3n5iGqW',
                },
            },
        ],
    },
    {
        name: 'Hide Meropenem result',
        id: 'p2mZM2tKXwj',
        condition: "values['vX1XAmSKfxx'] == '' && values['S5dYjuVXvgZ'] == ''",
        priority: 1,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'thCdTXXT25e',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'kQdkrguULKu',
                },
            },
        ],
    },
    {
        name: 'Hide Tedizolid result',
        id: 'QzeMwuCrQhD',
        condition: "values['Lz4fFdfTraY'] == ''",
        priority: 1,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'FfR7x77Uklq',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'nC3oX0BTgzT',
                },
            },
        ],
    },
    {
        name: 'Hide Ciprofloxacine result',
        id: 'OE4oyqqkddY',
        condition: "values['nikrSOx63ce'] == '' && values['f666SCFrjuM'] == ''",
        priority: 1,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'nDD5RUfmmFg',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Hide Tedizolid result',
        id: 'fMhYtZL4RaM',
        condition: "values['Lz4fFdfTraY'] == ''",
        priority: 1,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'PYXZMmVko2P',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'nC3oX0BTgzT',
                },
            },
        ],
    },
    {
        name: 'Hide Ciprofloxacin result',
        id: 'yDTMblzFQF5',
        condition: "values['nikrSOx63ce'] == '' && values['f666SCFrjuM'] == ''",
        priority: 1,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'fqsx8mawvFq',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Hide Teicoplanin result',
        id: 'OPIYE3MIu1R',
        condition: "values['dKKdjYiuEgS'] == '' && values['kLW9bWM50BH'] == ''",
        priority: 1,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'Qn1GWT7kKlf',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'ybC1G6MJdST',
                },
            },
        ],
    },
    {
        name: 'Hide Ciprofloxacin result',
        id: 'NbUETHq13jZ',
        condition: "values['nikrSOx63ce'] == '' && values['f666SCFrjuM'] == ''",
        priority: 1,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'DQfx4PyF5Qd',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Hide Teicoplanin result',
        id: 'YoxoQbU7rJn',
        condition: "values['dKKdjYiuEgS'] == '' && values['kLW9bWM50BH'] == ''",
        priority: 1,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'EmmtU4nzv6u',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'ybC1G6MJdST',
                },
            },
        ],
    },
    {
        name: 'Hide Ciprofloxacin result',
        id: 'SDjIyYAnzKo',
        condition: "values['nikrSOx63ce'] == '' && values['f666SCFrjuM'] == ''",
        priority: 1,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'iWpOMsrLTMM',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Hide Telavancin result',
        id: 'c0MwaUmbINx',
        condition: "values['ObFPFRjDTJl'] == ''",
        priority: 1,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'gcg9vbvJ044',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'G2ZnBpYjlLz',
                },
            },
        ],
    },
    {
        name: 'Hide Ciprofloxacin result',
        id: 'X31gczlSNiL',
        condition: "values['nikrSOx63ce'] == '' && values['f666SCFrjuM'] == ''",
        priority: 1,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'WGFPGKzj9bf',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Hide Telavancin result',
        id: 'Y2UzCZbqphb',
        condition: "values['ObFPFRjDTJl'] == ''",
        priority: 1,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'CAwitiK3NWh',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'G2ZnBpYjlLz',
                },
            },
        ],
    },
    {
        name: 'Hide Ciprofloxacin result',
        id: 'WHhD8JHJk37',
        condition:
            "values['nikrSOx63ce'] == '' && values['f666SCFrjuM'] == '' ",
        priority: 1,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'c7GTj31Tw71',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Hide Tetracycline result',
        id: 'RORwMiQX16R',
        condition: "values['LfdV52yh0VB'] == '' && values['ZRc36SwmAFa'] == ''",
        priority: 1,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'tsnF54AAAUI',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'if0UEH2z3ko',
                },
            },
        ],
    },
    {
        name: 'Hide Clindamycin result',
        id: 'qR7ls5XoD6H',
        condition: "values['fqQhGWtrmaJ'] == '' && values['SkcqqcG5VxY'] == ''",
        priority: 1,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'eFDjacrhezr',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'tMlqkDDf0Kb',
                },
            },
        ],
    },
    {
        name: 'Hide Tetracyclin result',
        id: 'Z5jZJYtLh5L',
        condition: "values['LfdV52yh0VB'] == '' && values['ZRc36SwmAFa'] == ''",
        priority: 1,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'Y2KJca8G0tS',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'if0UEH2z3ko',
                },
            },
        ],
    },
    {
        name: 'Hide Meropenem result',
        id: 'wsonr9v5lTq',
        condition: "values['vX1XAmSKfxx'] == '' && values['S5dYjuVXvgZ'] == ''",
        priority: 1,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'FL9JTIlY2Yx',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'kQdkrguULKu',
                },
            },
        ],
    },
    {
        name: 'Hide Ticarcillin calvulanic acid result',
        id: 'gN6NECbWKV3',
        condition: "values['LRy2NHqYMwX'] == ''",
        priority: 1,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'CLK6KU5wxZn',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'Y5vdpVE4c9Y',
                },
            },
        ],
    },
    {
        name: 'Hide Colistin result',
        id: 'KzLyVjzzquP',
        condition: "values['DFZBK5SZEWv'] == ''",
        priority: 1,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'd2MJoICOBI1',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'CrkSOhRJQbn',
                },
            },
        ],
    },
    {
        name: 'Hide Tigecycline result',
        id: 'kpwmYdD9Jpy',
        condition: "values['hBecr5SkCYj'] == ''",
        priority: 1,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'eL8wOwJEmpX',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'ttMk5chnwFx',
                },
            },
        ],
    },
    {
        name: 'Hide Colistin result',
        id: 'stVgasm5cx3',
        condition: "values['DFZBK5SZEWv'] == ''",
        priority: 1,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'OO3cNDoOJUp',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'CrkSOhRJQbn',
                },
            },
        ],
    },
    {
        name: 'Hide Tobramycine result',
        id: 'EKIx4ahKhgw',
        condition: "values['C2ThEwTZ6rm'] == '' && values['xllrLKdvFjA'] == ''",
        priority: 1,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'QdGQm8QqUdG',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'QPsxi3sEk8L',
                },
            },
        ],
    },
    {
        name: 'Hide Linezolid result',
        id: 'MheG0G8yAvf',
        condition: "values['i9UVYE6KfMc'] == '' && values['XnpQNv3UjES'] == ''",
        priority: 1,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'GkFt4Rthb9m',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'Dv4xMfbGkNr',
                },
            },
        ],
    },
    {
        name: 'Hide Trimethoprim - Sulfamethoxazole result',
        id: 'OgJzjD12HXR',
        condition:
            "values['IvruNSGNqg7'] == '' && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] == ''",
        priority: 1,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'ow4FAQyqhtM',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Hide Linezolid result',
        id: 'VsECZKtBaKp',
        condition: "values['i9UVYE6KfMc'] == '' && values['XnpQNv3UjES'] == ''",
        priority: 1,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'ClJBBvTiwtq',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'Dv4xMfbGkNr',
                },
            },
        ],
    },
    {
        name: 'Hide Anidulafungin result',
        id: 'NRROeOFjDWP',
        condition: "values['trZzJwgaHR3'] == ''",
        priority: 1,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'YTELBAGO5q0',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'R1EXA3KKknF',
                },
            },
        ],
    },
    {
        name: 'Hide Levofloxacin result',
        id: 'oz4ut7BZb7d',
        condition: "values['E7EyQm7euHu'] == '' && values['f3R5QjfaCMc'] == ''",
        priority: 1,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'MdFm6661H1C',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'oGYzzGCDmze',
                },
            },
        ],
    },
    {
        name: 'Hide Trimethoprim - Sulfamethoxazole result',
        id: 'pdcS0aCg4B4',
        condition:
            "values['IvruNSGNqg7'] == '' && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] == ''",
        priority: 1,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'tk9LNMlTLIS',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Hide Levofloxacin result',
        id: 'lSnSMx9vlRp',
        condition: "values['E7EyQm7euHu'] == '' && values['f3R5QjfaCMc'] == ''",
        priority: 1,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'HnjzTEF4avt',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'oGYzzGCDmze',
                },
            },
        ],
    },
    {
        name: 'Hide Trimethoprim sulfamethoxazole result',
        id: 'pNgUCbtf9QV',
        condition:
            "values['IvruNSGNqg7'] == '' && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] == ''",
        priority: 1,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'xmksN6RXruz',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Hide Levofloxacin Result',
        id: 'RcEOwhE2co8',
        condition: "values['f3R5QjfaCMc'] == ''",
        priority: 1,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'eHu9iJhfX7N',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'oGYzzGCDmze',
                },
            },
        ],
    },
    {
        name: 'Hide Trimethoprim-sulfamethoxazole result',
        id: 'tepWav3xyuW',
        condition:
            "values['IvruNSGNqg7'] == '' && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] == ''",
        priority: 1,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'E75LNF7gIRe',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Hide Itraconazole result',
        id: 'fLBXKbiZEZL',
        condition: "values['wbKF56To77p'] == '' && values['G5g9qxaItEc'] == ''",
        priority: 1,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'lPAEpjLnn84',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'JCuTkhsL29K',
                },
            },
        ],
    },
    {
        name: 'Hide Trimethoprim-sulfamethoxazole result',
        id: 's57RggzJdaK',
        condition:
            "values['IvruNSGNqg7'] == '' && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] == ''",
        priority: 1,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'Top1UZtqMFC',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Hide Imipenem result',
        id: 'kmKXNRkM9Sb',
        condition: "values['fOmuusloF7k'] == '' && values['f0vYwlbsdQA'] == ''",
        priority: 1,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'Hqp0P6IWcWA',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'WpEHYngpFoy',
                },
            },
        ],
    },
    {
        name: 'Hide Vancomycin result',
        id: 'Fn9zsiNhZeT',
        condition: "values['LSIvZSvxTjw'] == ''",
        priority: 1,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'Au84GqRrCz0',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'ZTVj4ZP4Be2',
                },
            },
        ],
    },
    {
        name: 'Hide Imipenem result',
        id: 'mDczOxbRPg4',
        condition: "values['fOmuusloF7k'] == '' && values['f0vYwlbsdQA'] == ''",
        priority: 1,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'fEJgeS7fGxU',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'WpEHYngpFoy',
                },
            },
        ],
    },
    {
        name: 'Hide Ampicillin result',
        id: 'aOOFAqIDtB0',
        condition: "values['O3Z3ACXAJ5x'] == '' && values['qKy76L49kQ5'] == ''",
        priority: 1,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 's2nZcdFqvGE',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'zR8xStM07CW',
                },
            },
        ],
    },
    {
        name: 'Hide Gentamicin result',
        id: 'YZIppGJUvID',
        condition: "values['FI1TVmmpjh9'] == '' && values['HISVzNoIL07'] == ''",
        priority: 1,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'IpAkyYLPBLH',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'NHwYKsfbcx3',
                },
            },
        ],
    },
    {
        name: 'Hide Ampicillin Result',
        id: 'g3g52g2GqIG',
        condition: "values['O3Z3ACXAJ5x'] == '' && values['qKy76L49kQ5'] == ''",
        priority: 1,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'GXQuyA9sRu3',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'zR8xStM07CW',
                },
            },
        ],
    },
    {
        name: 'Hide Gentamicin HL result',
        id: 'P4JHllNaFsq',
        condition:
            "(values['fbfJO2u7vnf'] == '' && values['y9r6wFWWFgl'] == '')",
        priority: 1,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'olKWl9VasGt',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'Ws4xKP2lqIp',
                },
            },
        ],
    },
    {
        name: 'Hide Ampicillin result',
        id: 'LPlBxK255Ab',
        condition: "values['O3Z3ACXAJ5x'] == '' && values['qKy76L49kQ5'] == ''",
        priority: 1,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'GFeat5uQozM',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'zR8xStM07CW',
                },
            },
        ],
    },
    {
        name: 'Hide Ertapenem result',
        id: 'k7labRDo66A',
        condition: "values['el3u1NbJxSg'] == '' && values['lL2LC94BTw3'] == ''",
        priority: 1,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'FIvhw554rqe',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'obDZttfd7Cm',
                },
            },
        ],
    },
    {
        name: 'Hide Amphotericin B result',
        id: 'eN6QnmbkugB',
        condition: "values['dq8ORL3DxkI'] == '' && values['bE5meXeHH3H'] == ''",
        priority: 1,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'MuELpcy70y7',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'GB0gugeqeG9',
                },
            },
        ],
    },
    {
        name: 'Hide Erythromycin result',
        id: 'cft6fFzhvEa',
        condition: "values['qDSjjhuaYm0'] == '' && values['wIazRVCpnlK'] == ''",
        priority: 1,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'Chzr6MkFq9g',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'fgJmrICgNAX',
                },
            },
        ],
    },
    {
        name: 'Hide Vancomycin result',
        id: 'kF04ktQJqhm',
        condition: "values['EokAjmU3HLE'] == '' && values['LSIvZSvxTjw'] == ''",
        priority: 1,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'uZheqRhUvzr',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'ZTVj4ZP4Be2',
                },
            },
        ],
    },
    {
        name: 'Hide Fluconazole',
        id: 'BoqjTvEONR4',
        condition:
            "values['SaQe2REkGVw'] == 'AFL' || values['SaQe2REkGVw'] == 'AFU' || values['SaQe2REkGVw'] == 'ANI' || values['SaQe2REkGVw'] == 'ATE' || values['SaQe2REkGVw'] == 'AND' || values['SaQe2REkGVw'] == 'AVL' ",
        priority: 1,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'QvpwFhkQtUU',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'GIPEuxYHchx',
                },
            },
            {
                id: 'Gq1RWKXD6sl',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'oGOXPS5VVPW',
                },
            },
        ],
    },
    {
        name: 'Hide Amikacin result',
        id: 'WW6fhg4JFhs',
        condition: "values['VGdJnkTlNyK'] == '' && values['GYNpOJWcNx2'] == ''",
        priority: 1,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'DhVCXZ1RvMo',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'KmgWX65h0iM',
                },
            },
        ],
    },
    {
        name: 'Hide Fluconazole result',
        id: 'ScDBohrlnJv',
        condition: "values['GIPEuxYHchx'] == '' && values['oGOXPS5VVPW'] == ''",
        priority: 1,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'ehgMhJtfPB7',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'lkmtYNGKlRL',
                },
            },
        ],
    },
    {
        name: 'Hide Amikacin result',
        id: 'Pkqp8uB1bkw',
        condition: "values['VGdJnkTlNyK'] == '' && values['GYNpOJWcNx2'] == ''",
        priority: 1,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'EhfUoFxaG3Q',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'KmgWX65h0iM',
                },
            },
        ],
    },
    {
        name: 'Hide Fosfomycin result',
        id: 'Zu4dpaifUXk',
        condition: "values['tVIynZXmqls'] == '' && values['PTbpw8gED1N'] == ''",
        priority: 1,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'xNBo2Ba4aGI',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'mx4AYggTTir',
                },
            },
        ],
    },
    {
        name: 'Hide Voriconazole result',
        id: 'Czd2e8YoH1v',
        condition: "values['nd0GPkFGNsN'] == '' && values['TSuE4UQ749K'] == ''",
        priority: 1,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'XnzKR7R3TKJ',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'WOEXv3xikbQ',
                },
            },
        ],
    },
    {
        name: 'Hide Cefixime result',
        id: 'EIC8SqzYk1u',
        condition: "values['YevRvdwsL3o'] == '' && values['OW7Hm6tlWik'] == ''",
        priority: 1,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'uKQDaMQyh8j',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'NvEaW4yvDpz',
                },
            },
        ],
    },
    {
        name: 'Hide Fosfomycin result',
        id: 'KBH0rPfyRlc',
        condition: "values['tVIynZXmqls'] == '' && values['PTbpw8gED1N'] == ''",
        priority: 1,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'LeyxGVZsDx7',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'mx4AYggTTir',
                },
            },
        ],
    },
    {
        name: 'Assign value for Colistin_Resistant',
        id: 'Y65H1TtsicH',
        condition:
            "(values['DFZBK5SZEWv'] >= 4 && values['DFZBK5SZEWv'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'KJhW5ROSlPh',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'CrkSOhRJQbn',
                },
            },
        ],
    },
    {
        name: 'Assign value for Telavancin_Resistant',
        id: 'lIPCQtmHGEC',
        condition:
            "(values['ObFPFRjDTJl'] >= 0.5 && values['ObFPFRjDTJl'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'r461035ZnFQ',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'G2ZnBpYjlLz',
                },
            },
        ],
    },
    {
        name: 'Assign value for Telavancin_Susceptible',
        id: 'JKy2lL9ocKD',
        condition:
            "(values['ObFPFRjDTJl'] <= 0.12 && values['ObFPFRjDTJl'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'xXjpLcbTHDP',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'G2ZnBpYjlLz',
                },
            },
        ],
    },
    {
        name: 'Assign value for Telavancin_Susceptible',
        id: 'kbg1noz9NP9',
        condition:
            "(values['ObFPFRjDTJl'] <= 0.25 && values['ObFPFRjDTJl'] != '') ",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'qUqooci2BWz',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'G2ZnBpYjlLz',
                },
            },
        ],
    },
    {
        name: 'Assign value for Telavancin_Resistant',
        id: 'AeauSKXCpOV',
        condition:
            "(values['ObFPFRjDTJl'] >= 0.25 && values['ObFPFRjDTJl'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'C3kAcYd5lCX',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'G2ZnBpYjlLz',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tetracycline_Resistant',
        id: 'PnfVJKaxCYu',
        condition:
            "(values['LfdV52yh0VB'] <= 11 && values['ZRc36SwmAFa'] == '' && values['LfdV52yh0VB'] != '') || (values['ZRc36SwmAFa'] >= 16 && values['ZRc36SwmAFa'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'RigDIopHmQt',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'if0UEH2z3ko',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tetracycline_Susceptible',
        id: 'vE9ayyJNpbD',
        condition:
            "(values['LfdV52yh0VB'] >= 15 && values['ZRc36SwmAFa'] == '' && values['LfdV52yh0VB'] != '') || (values['ZRc36SwmAFa'] <= 4 && values['ZRc36SwmAFa'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'XbWsZTlLHXe',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'if0UEH2z3ko',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tetracyclin_Intermediate',
        id: 'GWfIaRlE2wV',
        condition:
            "(values['LfdV52yh0VB'] > 11 && values['LfdV52yh0VB'] < 15 && values['ZRc36SwmAFa'] == '' && values['LfdV52yh0VB'] != '') || (values['ZRc36SwmAFa'] > 4 && values['ZRc36SwmAFa'] < 16 && values['ZRc36SwmAFa'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'Zm99n87hbv4',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'if0UEH2z3ko',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tetracyclin_Resistant',
        id: 'bPLqHMe5oSQ',
        condition:
            "(values['LfdV52yh0VB'] <= 11 && values['ZRc36SwmAFa'] == '' && values['LfdV52yh0VB'] != '') || (values['ZRc36SwmAFa'] >= 16 && values['ZRc36SwmAFa'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'rIXgxGnNtUW',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'if0UEH2z3ko',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tetracyclin_Susceptible',
        id: 'pWI7pWWkxTk',
        condition:
            "(values['LfdV52yh0VB'] >= 15 && values['ZRc36SwmAFa'] == '' && values['LfdV52yh0VB'] != '') || (values['ZRc36SwmAFa'] <= 4 && values['ZRc36SwmAFa'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'CpDBuaBi1JV',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'if0UEH2z3ko',
                },
            },
        ],
    },
    {
        name: 'Assign value for Telavancin_Intermediate',
        id: 'qQNtfiHdC9v',
        condition:
            "(values['ObFPFRjDTJl'] > 0.25 && values['ObFPFRjDTJl'] < 0.5 && values['ObFPFRjDTJl'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'AKLaSvyxx1l',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'G2ZnBpYjlLz',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ticarcillin calvulanic acid_Intermediate',
        id: 'BPqtZ5RuvHa',
        condition:
            "(values['LRy2NHqYMwX'] > 16 && values['LRy2NHqYMwX'] < 128 && values['LRy2NHqYMwX'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'JpRC2XtVsZW',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'Y5vdpVE4c9Y',
                },
            },
        ],
    },
    {
        name: 'Assign value for Telavancin_Intermediate',
        id: 'ZSOvmSVG2Qp',
        condition:
            "(values['ObFPFRjDTJl'] > 0.12 && values['ObFPFRjDTJl'] < 0.25 && values['ObFPFRjDTJl'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'dfBqROw4ZHR',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'G2ZnBpYjlLz',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ticarcillin-calvulanic acid_Resistant',
        id: 'mhi0UDDxu3q',
        condition:
            "(values['LRy2NHqYMwX'] >= 128 && values['LRy2NHqYMwX'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'tqB4jJt7hG0',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'Y5vdpVE4c9Y',
                },
            },
        ],
    },
    {
        name: 'Assign value for Teicoplanin_Susceptible',
        id: 'EKvK7t2Yzs2',
        condition:
            "(values['dKKdjYiuEgS'] >= 14 && values['kLW9bWM50BH'] == '' && values['dKKdjYiuEgS'] != '') || (values['kLW9bWM50BH'] <= 8 && values['kLW9bWM50BH'] != '') ",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'u8PK2kZnjkp',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'ybC1G6MJdST',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ticarcillin calvulanic acid_Susceptible',
        id: 'WTdUg1dtscU',
        condition:
            " (values['LRy2NHqYMwX'] <= 16 && values['LRy2NHqYMwX'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'oDbQ0FtkdYJ',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'Y5vdpVE4c9Y',
                },
            },
        ],
    },
    {
        name: 'Assign value for Teicoplanin_Susceptible',
        id: 'OBXradua3D3',
        condition:
            "(values['dKKdjYiuEgS'] >= 14 && values['kLW9bWM50BH'] == '' && values['dKKdjYiuEgS'] != '') || (values['kLW9bWM50BH'] <= 8 && values['kLW9bWM50BH'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'c2S0ECcmisU',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'ybC1G6MJdST',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tigecycline_Intermediate',
        id: 'VWF1JkdGJ4W',
        condition:
            "(values['hBecr5SkCYj'] > 0.5 && values['hBecr5SkCYj'] < 1 && values['hBecr5SkCYj'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'pIYXl2fr6RJ',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'ttMk5chnwFx',
                },
            },
        ],
    },
    {
        name: 'Assign value for Teicoplanin_Resistant',
        id: 'QTjKWtmGFEi',
        condition:
            "(values['dKKdjYiuEgS'] <= 10 && values['kLW9bWM50BH'] == '' && values['dKKdjYiuEgS'] != '') || (values['kLW9bWM50BH'] >= 32 && values['kLW9bWM50BH'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'XLzGSo3EK1b',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'ybC1G6MJdST',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tigecycline_Resistant',
        id: 'SJw3AVdjhAO',
        condition:
            "(values['hBecr5SkCYj'] >= 1 && values['hBecr5SkCYj'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'm0OAA9ThlI7',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'ttMk5chnwFx',
                },
            },
        ],
    },
    {
        name: 'Assign value for Teicoplanin_Resistant',
        id: 'gSpKSstM1KD',
        condition:
            "(values['dKKdjYiuEgS'] <= 10 && values['kLW9bWM50BH'] == '' && values['dKKdjYiuEgS'] != '') || (values['kLW9bWM50BH'] >= 32 && values['kLW9bWM50BH'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'SuWG0LIq1mY',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'ybC1G6MJdST',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tigecycline_Susceptible',
        id: 'fX3BPRTqNSO',
        condition:
            "(values['hBecr5SkCYj'] <= 0.5 && values['hBecr5SkCYj'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'uS6TBoparXv',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'ttMk5chnwFx',
                },
            },
        ],
    },
    {
        name: 'Assign value for Teicoplanin_Intermediate',
        id: 'qqFY0O03H7p',
        condition:
            "(values['dKKdjYiuEgS'] > 10 && values['dKKdjYiuEgS'] < 14 && values['kLW9bWM50BH'] == '' && values['dKKdjYiuEgS'] != '') || (values['kLW9bWM50BH'] > 8 && values['kLW9bWM50BH'] < 32 && values['kLW9bWM50BH'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'I3I8VwR4Cpe',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'ybC1G6MJdST',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tobramycin_Intermediate',
        id: 'ezKMrI710XZ',
        condition:
            "(values['C2ThEwTZ6rm'] > 12 && values['C2ThEwTZ6rm'] < 15 && values['xllrLKdvFjA'] == '' && values['C2ThEwTZ6rm'] != '') || (values['xllrLKdvFjA'] > 4 && values['xllrLKdvFjA'] < 16 && values['xllrLKdvFjA'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'PGiirSUuHEx',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'QPsxi3sEk8L',
                },
            },
        ],
    },
    {
        name: 'Assign value for Teicoplanin_Intermediate',
        id: 'brpR2NzKoCu',
        condition:
            "(values['dKKdjYiuEgS'] > 10 && values['dKKdjYiuEgS'] < 14 && values['kLW9bWM50BH'] == '' && values['dKKdjYiuEgS'] != '') || (values['kLW9bWM50BH'] > 8 && values['kLW9bWM50BH'] < 32 && values['kLW9bWM50BH'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'QOAZBcCXSgC',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'ybC1G6MJdST',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tobramycin_Resistant',
        id: 'TYC2q7WDWos',
        condition:
            "(values['C2ThEwTZ6rm'] <= 12 && values['xllrLKdvFjA'] == '' && values['C2ThEwTZ6rm'] != '') || (values['xllrLKdvFjA'] >= 16 && values['xllrLKdvFjA'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'K1rDCG1rDhr',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'QPsxi3sEk8L',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tedizolid_Susceptible',
        id: 'CrTmbef8T07',
        condition:
            "(values['Lz4fFdfTraY'] <= 0.5 && values['Lz4fFdfTraY'] != '') ",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'qmByMAFgHrp',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'nC3oX0BTgzT',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tobramycin_Susceptible',
        id: 's6fXLlenYJw',
        condition:
            "(values['C2ThEwTZ6rm'] >= 15 && values['xllrLKdvFjA'] == '' && values['C2ThEwTZ6rm'] != '') || (values['xllrLKdvFjA'] <= 4 && values['xllrLKdvFjA'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'yuJNGWRyhab',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'QPsxi3sEk8L',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tedizolid_Susceptible',
        id: 'KXJtNTpRfhI',
        condition:
            "(values['Lz4fFdfTraY'] <= 0.5 && values['Lz4fFdfTraY'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'Hwef7y5wYgU',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'nC3oX0BTgzT',
                },
            },
        ],
    },
    {
        name: 'Assign value for Amikacin_Intermediate',
        id: 'FiMPT7P9GHO',
        condition:
            "(values['VGdJnkTlNyK'] > 14 && values['VGdJnkTlNyK'] < 17 && values['GYNpOJWcNx2'] == '' && values['VGdJnkTlNyK'] != '') || (values['GYNpOJWcNx2'] > 16 && values['GYNpOJWcNx2'] < 64 && values['GYNpOJWcNx2'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'wdm44IofLex',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'KmgWX65h0iM',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tedizolid_Resistant',
        id: 'c95ZfUuD8L3',
        condition:
            "(values['Lz4fFdfTraY'] >= 1 && values['Lz4fFdfTraY'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'WBN0PzUaW39',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'nC3oX0BTgzT',
                },
            },
        ],
    },
    {
        name: 'Assign value for Trimethoprim - Sulfamethoxazole_Intermediate',
        id: 'cktlep32u78',
        condition:
            "(values['IvruNSGNqg7'] > 10 && values['IvruNSGNqg7'] < 16 && values['dSu1B7lkeEM'] == '' && values['IvruNSGNqg7'] != '') || (values['dSu1B7lkeEM'] > 40 && values['dSu1B7lkeEM'] < 80 && values['dSu1B7lkeEM'] != '') || (values['Hp3PSM2svaM'] > 10 && values['Hp3PSM2svaM'] < 16 && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] != '') ",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'Hz4AlY9jLFM',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tedizolid_Resistant',
        id: 'wOzURQJ4Yiu',
        condition:
            "(values['Lz4fFdfTraY'] >= 2 && values['Lz4fFdfTraY'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'CQTuGHpg0uW',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'nC3oX0BTgzT',
                },
            },
        ],
    },
    {
        name: 'Assign value for Trimethoprim sulfamethoxazole _Intermediate',
        id: 'JfCPWGbyV00',
        condition:
            "(values['IvruNSGNqg7'] > 10 && values['IvruNSGNqg7'] < 16 && values['dSu1B7lkeEM'] == '' && values['IvruNSGNqg7'] != '') || (values['dSu1B7lkeEM'] > 40 && values['dSu1B7lkeEM'] < 80 && values['dSu1B7lkeEM'] != '') || (values['Hp3PSM2svaM'] > 10 && values['Hp3PSM2svaM'] < 16 && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'WywZybwUn1T',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tedizolid_Intermediate',
        id: 'wWhv6ZCB9UF',
        condition:
            "(values['Lz4fFdfTraY'] > 0.5 && values['Lz4fFdfTraY'] < 1 && values['Lz4fFdfTraY'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'VkJkVljQQ8g',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'nC3oX0BTgzT',
                },
            },
        ],
    },
    {
        name: 'Assign value for Trimethoprim-sulfamethoxazole_Intermediate',
        id: 'ChfJkJe9fnh',
        condition:
            "(values['IvruNSGNqg7'] > 10 && values['IvruNSGNqg7'] < 16 && values['dSu1B7lkeEM'] == '' && values['IvruNSGNqg7'] != '') || (values['dSu1B7lkeEM'] > 40 && values['dSu1B7lkeEM'] < 80 && values['dSu1B7lkeEM'] != '') || (values['Hp3PSM2svaM'] > 10 && values['Hp3PSM2svaM'] < 16 && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'nkx1egt7gab',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tedizolid_Intermediate',
        id: 'L0cLd4B38IQ',
        condition:
            "(values['Lz4fFdfTraY'] > 0.5 && values['Lz4fFdfTraY'] < 2 && values['Lz4fFdfTraY'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'gm5o853fSO0',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'nC3oX0BTgzT',
                },
            },
        ],
    },
    {
        name: 'Assign value for Trimethoprim-sulfamethoxazole_Intermediate',
        id: 'kpHhBnyOu5W',
        condition:
            "(values['IvruNSGNqg7'] > 10 && values['IvruNSGNqg7'] < 16 && values['dSu1B7lkeEM'] == '' && values['IvruNSGNqg7'] != '') || (values['dSu1B7lkeEM'] > 40 && values['dSu1B7lkeEM'] < 80 && values['dSu1B7lkeEM'] != '') || (values['Hp3PSM2svaM'] > 10 && values['Hp3PSM2svaM'] < 16 && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'qyOCLEuLSS0',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Assign value for Posaconazole_Susceptible',
        id: 'rdJBgyEkO8D',
        condition:
            "(values['rYMrMTYi1EK'] <= 17 && values['x0cDjIk7FLV'] == '' && values['rYMrMTYi1EK'] != '') || (values['x0cDjIk7FLV'] >= 1 && values['x0cDjIk7FLV'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'xviEorZ0n4C',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'iC1I3n5iGqW',
                },
            },
        ],
    },
    {
        name: 'Assign value for Trimethoprim - Sulfamethoxazole_Resistant',
        id: 'DGQbHkLStJN',
        condition:
            "(values['IvruNSGNqg7'] <= 10 && values['dSu1B7lkeEM'] == '' && values['IvruNSGNqg7'] != '') || (values['dSu1B7lkeEM'] >= 80 && values['dSu1B7lkeEM'] != '') || (values['Hp3PSM2svaM'] <= 10 && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] != '') ",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'kzNsdyLmYmu',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Assign value for Posaconazole_Resistant',
        id: 'Bnu3LEPGAwg',
        condition:
            "(values['rYMrMTYi1EK'] <= 16 && values['x0cDjIk7FLV'] == '' && values['rYMrMTYi1EK'] != '') || (values['x0cDjIk7FLV'] >= 17 && values['x0cDjIk7FLV'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'un0wROG3012',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'iC1I3n5iGqW',
                },
            },
        ],
    },
    {
        name: 'Assign value for Trimethoprim - Sulfamethoxazole_Resistant',
        id: 'DLDqTFX5SV5',
        condition:
            "(values['IvruNSGNqg7'] <= 10 && values['dSu1B7lkeEM'] == '' && values['IvruNSGNqg7'] != '') || (values['dSu1B7lkeEM'] >= 80 && values['dSu1B7lkeEM'] != '') || (values['Hp3PSM2svaM'] <= 10 && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] != '') ",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'xZoJYiI0kCP',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Assign value for Posaconazole_Intermediate',
        id: 'c2XXFQNrIdY',
        condition:
            "(values['rYMrMTYi1EK'] > 16 && values['rYMrMTYi1EK'] < 17 && values['x0cDjIk7FLV'] == '' && values['rYMrMTYi1EK'] != '') || (values['x0cDjIk7FLV'] > 1 && values['x0cDjIk7FLV'] < 2 && values['x0cDjIk7FLV'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'ArAUXATSaHT',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'iC1I3n5iGqW',
                },
            },
        ],
    },
    {
        name: 'Assign value for Trimethoprim sulfamethoxazole_Resistant',
        id: 'VYBtCJPAwmS',
        condition:
            "(values['IvruNSGNqg7'] <= 10 && values['dSu1B7lkeEM'] == '' && values['IvruNSGNqg7'] != '') || (values['dSu1B7lkeEM'] >= 80 && values['dSu1B7lkeEM'] != '') || (values['Hp3PSM2svaM'] <= 10 && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] != '') ",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'bYFjt2XvaIs',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Assign value for Piperacillin-tazobactam_Susceptible',
        id: 'Exp2hnRORA1',
        condition:
            "(values['LX2UJgFtmhE'] >= 15 && values['j7Oenm7cXWx'] == '' && values['LX2UJgFtmhE'] != '') || (values['j7Oenm7cXWx'] <= 16 && values['j7Oenm7cXWx'] != '') || (values['O6dwlDQhKUS'] >= 15 && values['j7Oenm7cXWx'] == '' && values['O6dwlDQhKUS'] != '') ",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'pe2RG0CYQNv',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'cxZhnL2j4AX',
                },
            },
        ],
    },
    {
        name: 'Assign value for Trimethoprim-sulfamethoxazole_Resistant',
        id: 'Oi6cWN5OLNR',
        condition:
            "(values['IvruNSGNqg7'] <= 10 && values['dSu1B7lkeEM'] == '' && values['IvruNSGNqg7'] != '') || (values['dSu1B7lkeEM'] >= 80 && values['dSu1B7lkeEM'] != '') || (values['Hp3PSM2svaM'] <= 10 && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] != '') ",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'IYkUfxaPHQg',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Assign value for Piperacillin-tazobactam_Susceptible',
        id: 'dWqeYzUSfuY',
        condition:
            "(values['LX2UJgFtmhE'] >= 15 && values['j7Oenm7cXWx'] == '' && values['LX2UJgFtmhE'] != '') || (values['j7Oenm7cXWx'] <= 16 && values['j7Oenm7cXWx'] != '') || (values['O6dwlDQhKUS'] >= 21 && values['j7Oenm7cXWx'] == '' && values['O6dwlDQhKUS'] != '') ",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'Og92qDo4HJe',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'cxZhnL2j4AX',
                },
            },
        ],
    },
    {
        name: 'Assign value for Trimethoprim-sulfamethoxazole_Resistant',
        id: 'r0Iao8Mjbdg',
        condition:
            "(values['IvruNSGNqg7'] <= 10 && values['dSu1B7lkeEM'] == '' && values['IvruNSGNqg7'] != '') || (values['dSu1B7lkeEM'] >= 80 && values['dSu1B7lkeEM'] != '') || (values['Hp3PSM2svaM'] <= 10 && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] != '') ",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'ysxtx0rD50C',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Assign value for Piperacillin-tazobactam_Resistant',
        id: 'SlXoYFm9FiZ',
        condition:
            "(values['LX2UJgFtmhE'] <= 12 && values['j7Oenm7cXWx'] == '' && values['LX2UJgFtmhE'] != '') || (values['j7Oenm7cXWx'] >= 128 && values['j7Oenm7cXWx'] != '') || (values['O6dwlDQhKUS'] <= 12 && values['j7Oenm7cXWx'] == '' && values['O6dwlDQhKUS'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'DFiSfNJlIL5',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'cxZhnL2j4AX',
                },
            },
        ],
    },
    {
        name: 'Assign value for Trimethoprim - Sulfamethoxazole_Susceptible',
        id: 'ZKvATJgc57K',
        condition:
            "(values['IvruNSGNqg7'] >= 16 && values['dSu1B7lkeEM'] == '' && values['IvruNSGNqg7'] != '') || (values['dSu1B7lkeEM'] <= 40 && values['dSu1B7lkeEM'] != '') || (values['Hp3PSM2svaM'] >= 16 && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] != '') ",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'DAlAuaOS9HG',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Assign value for Piperacillin-tazobactam_Resistant',
        id: 'kXhUT8fEtvQ',
        condition:
            "(values['LX2UJgFtmhE'] <= 17 && values['j7Oenm7cXWx'] == '' && values['LX2UJgFtmhE'] != '') || (values['j7Oenm7cXWx'] >= 128 && values['j7Oenm7cXWx'] != '') || (values['O6dwlDQhKUS'] <= 17 && values['j7Oenm7cXWx'] == '' && values['O6dwlDQhKUS'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'yKwnd8j5Aya',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'cxZhnL2j4AX',
                },
            },
        ],
    },
    {
        name: 'Assign value for Trimethoprim - Sulfamethoxazole_Susceptible',
        id: 'WTwgkFS04sX',
        condition:
            "(values['IvruNSGNqg7'] >= 16 && values['dSu1B7lkeEM'] == '' && values['IvruNSGNqg7'] != '') || (values['dSu1B7lkeEM'] <= 40 && values['dSu1B7lkeEM'] != '') || (values['Hp3PSM2svaM'] >= 16 && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'alzbzPVzqxF',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Assign value for Piperacillin-tazobactam_Intermediate',
        id: 'ozCkA9uk5aX',
        condition:
            "(values['LX2UJgFtmhE'] > 12 && values['LX2UJgFtmhE'] < 15 && values['j7Oenm7cXWx'] == '' && values['LX2UJgFtmhE'] != '') || (values['j7Oenm7cXWx'] > 16 && values['j7Oenm7cXWx'] < 128 && values['j7Oenm7cXWx'] != '') || (values['O6dwlDQhKUS'] > 12 && values['O6dwlDQhKUS'] < 15 && values['j7Oenm7cXWx'] == '' && values['O6dwlDQhKUS'] != '') ",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'Iv75tCOCClC',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'cxZhnL2j4AX',
                },
            },
        ],
    },
    {
        name: 'Assign value for Trimethoprim sulfamethoxazole_Susceptible',
        id: 'CqekOvYHL3Q',
        condition:
            "(values['IvruNSGNqg7'] >= 16 && values['dSu1B7lkeEM'] == '' && values['IvruNSGNqg7'] != '') || (values['dSu1B7lkeEM'] <= 40 && values['dSu1B7lkeEM'] != '') || (values['Hp3PSM2svaM'] >= 16 && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] != '') ",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'j5tDF2yPiX4',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Assign value for Piperacillin-tazobactam_Intermediate',
        id: 'tKNNHoBZE5B',
        condition:
            "(values['LX2UJgFtmhE'] > 17 && values['LX2UJgFtmhE'] < 21 && values['j7Oenm7cXWx'] == '' && values['LX2UJgFtmhE'] != '') || (values['j7Oenm7cXWx'] > 16 && values['j7Oenm7cXWx'] < 128 && values['j7Oenm7cXWx'] != '') || (values['O6dwlDQhKUS'] > 17 && values['O6dwlDQhKUS'] < 21 && values['j7Oenm7cXWx'] == '' && values['O6dwlDQhKUS'] != '') ",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'VxtsxQnK5gd',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'cxZhnL2j4AX',
                },
            },
        ],
    },
    {
        name: 'Assign value for Trimethoprim-sulfamethoxazole_Susceptible',
        id: 'fMWIdtkElZH',
        condition:
            "(values['IvruNSGNqg7'] >= 16 && values['dSu1B7lkeEM'] == '' && values['IvruNSGNqg7'] != '') || (values['dSu1B7lkeEM'] <= 40 && values['dSu1B7lkeEM'] != '') || (values['Hp3PSM2svaM'] >= 16 && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] != '') ",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'cqlI4m282Id',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Assign value for Penicillin_Susceptible',
        id: 'NnLoEcLANCe',
        condition:
            "(values['f8Njqj2Flvf'] >= 29 && values['RFuGg98lXS9'] == '' && values['f8Njqj2Flvf'] != '') || (values['RFuGg98lXS9'] <= 0.12 && values['RFuGg98lXS9'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'vtS4nzt66k5',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'r1pTVxwlNcN',
                },
            },
        ],
    },
    {
        name: 'Assign value for Trimethoprim-sulfamethoxazole_Susceptible',
        id: 'D8KgXOQPZlJ',
        condition:
            "(values['IvruNSGNqg7'] >= 16 && values['dSu1B7lkeEM'] == '' && values['IvruNSGNqg7'] != '') || (values['dSu1B7lkeEM'] <= 40 && values['dSu1B7lkeEM'] != '') || (values['Hp3PSM2svaM'] >= 16 && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] != '') ",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'rzGTagfzVRt',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Assign value for Penicillin_Resistant',
        id: 'NxSwPSTzo1Q',
        condition:
            "(values['f8Njqj2Flvf'] <= 28 && values['RFuGg98lXS9'] == '' && values['f8Njqj2Flvf'] != '') || (values['RFuGg98lXS9'] >= 0.25 && values['RFuGg98lXS9'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'OQZKhAeY9EI',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'r1pTVxwlNcN',
                },
            },
        ],
    },
    {
        name: 'Assign value for Vancomycin_Intermediate',
        id: 'h04IxIsKTw4',
        condition:
            "(values['LSIvZSvxTjw'] > 2 && values['LSIvZSvxTjw'] < 16 && values['LSIvZSvxTjw'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'pL0HSgotyVd',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'ZTVj4ZP4Be2',
                },
            },
        ],
    },
    {
        name: 'Assign value for Penicillin_Intermediate',
        id: 'SR1kBHDR21A',
        condition:
            "(values['f8Njqj2Flvf'] > 28 && values['f8Njqj2Flvf'] < 29 && values['RFuGg98lXS9'] == '' && values['f8Njqj2Flvf'] != '') || (values['RFuGg98lXS9'] > 0.12 && values['RFuGg98lXS9'] < 0.25 && values['RFuGg98lXS9'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'Ndc1yVa6J1l',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'r1pTVxwlNcN',
                },
            },
        ],
    },
    {
        name: 'Assign value for Vancomycin_Intermediate',
        id: 'pqCwfB5cVbv',
        condition:
            "(values['EokAjmU3HLE'] > 14 && values['EokAjmU3HLE'] < 17 && values['LSIvZSvxTjw'] == '' && values['EokAjmU3HLE'] != '') || (values['LSIvZSvxTjw'] > 4 && values['LSIvZSvxTjw'] < 32 && values['LSIvZSvxTjw'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'QOpZgVL7Zqi',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'ZTVj4ZP4Be2',
                },
            },
        ],
    },
    {
        name: 'Assign value for Pefloxacin_Susceptible',
        id: 'TwjjbH99oSS',
        condition:
            "(values['i4LMwZk3svs'] >= 24 && values['i4LMwZk3svs'] != '') ",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'YxTHbXfdVNw',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'osuvYu8PVjw',
                },
            },
        ],
    },
    {
        name: 'Assign value for Vancomycin_Resistant',
        id: 'IbyFHjtIxjq',
        condition:
            "(values['LSIvZSvxTjw'] >= 16 && values['LSIvZSvxTjw'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'O7yWD0ICDn1',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'ZTVj4ZP4Be2',
                },
            },
        ],
    },
    {
        name: 'Assign value for Pefloxacin_Resistant',
        id: 'jOmzptcRT3c',
        condition:
            "(values['i4LMwZk3svs'] <= 23 && values['i4LMwZk3svs'] != '') ",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'zlcf6z6xLGA',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'osuvYu8PVjw',
                },
            },
        ],
    },
    {
        name: 'Assign value for Vancomycin_Resistant',
        id: 'YBNuUacsNHX',
        condition:
            "(values['EokAjmU3HLE'] <= 14 && values['LSIvZSvxTjw'] == '' && values['EokAjmU3HLE'] != '') || (values['LSIvZSvxTjw'] >= 32 && values['LSIvZSvxTjw'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'VAU3ViNL7b9',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'ZTVj4ZP4Be2',
                },
            },
        ],
    },
    {
        name: 'Assign value for Pefloxacin_Intermediate',
        id: 'u1sRt0SoMop',
        condition:
            "(values['i4LMwZk3svs'] > 23 && values['i4LMwZk3svs'] < 24 && values['i4LMwZk3svs'] != '') ",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'zEF0itbqiDv',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'osuvYu8PVjw',
                },
            },
        ],
    },
    {
        name: 'Assign value for Vancomycin_Susceptible',
        id: 'wzGV23CuQCk',
        condition:
            "(values['LSIvZSvxTjw'] <= 2 && values['LSIvZSvxTjw'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'aCs0vWm0oHW',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'ZTVj4ZP4Be2',
                },
            },
        ],
    },
    {
        name: 'Assign value for Oxacillin_Susceptible',
        id: 'wxlW01HJWRD',
        condition:
            "(values['Ou3P4jx4uuR'] >= 18 && values['Al6e3U8AznW'] == '' && values['Ou3P4jx4uuR'] != '') || (values['Al6e3U8AznW'] <= 2 && values['Al6e3U8AznW'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'cJzyAEq5tb2',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'NmcHHrLV0vd',
                },
            },
        ],
    },
    {
        name: 'Assign value for Vancomycin_Susceptible',
        id: 'QJeuzXoBuvX',
        condition:
            "(values['EokAjmU3HLE'] >= 17 && values['LSIvZSvxTjw'] == '' && values['EokAjmU3HLE'] != '') || (values['LSIvZSvxTjw'] <= 4 && values['LSIvZSvxTjw'] != '') ",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'AlcI0ZQ1tdO',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'ZTVj4ZP4Be2',
                },
            },
        ],
    },
    {
        name: 'Assign value for Oxacillin_Resistant',
        id: 'PW5EBP3IBLi',
        condition:
            "(values['Ou3P4jx4uuR'] <= 17 && values['Al6e3U8AznW'] == '' && values['Ou3P4jx4uuR'] != '') || (values['Al6e3U8AznW'] >= 8 && values['Al6e3U8AznW'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'VcSnCQ3XnuM',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'NmcHHrLV0vd',
                },
            },
        ],
    },
    {
        name: 'Assign value for Voriconazole_Intermediate',
        id: 'R5KIiK9cCSI',
        condition:
            "(values['nd0GPkFGNsN'] > 15 && values['nd0GPkFGNsN'] < 16 && values['TSuE4UQ749K'] == '' && values['nd0GPkFGNsN'] != '') || (values['TSuE4UQ749K'] > 0.25 && values['TSuE4UQ749K'] < 0.5 && values['TSuE4UQ749K'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'um00RKoBOQd',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'WOEXv3xikbQ',
                },
            },
        ],
    },
    {
        name: 'Assign value for Oxacillin_Intermediate',
        id: 'wxXoORu4Dq3',
        condition:
            "(values['Ou3P4jx4uuR'] > 17 && values['Ou3P4jx4uuR'] < 18 && values['Al6e3U8AznW'] == '' && values['Ou3P4jx4uuR'] != '') || (values['Al6e3U8AznW'] > 2 && values['Al6e3U8AznW'] < 4 && values['Al6e3U8AznW'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'BmjnaTfc3pG',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'NmcHHrLV0vd',
                },
            },
        ],
    },
    {
        name: 'Assign value for Voriconazole_Resistant',
        id: 'zXPZMtaIMU6',
        condition:
            "(values['nd0GPkFGNsN'] <= 14 && values['TSuE4UQ749K'] == '' && values['nd0GPkFGNsN'] != '') || (values['TSuE4UQ749K'] >= 1 && values['TSuE4UQ749K'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'RNeL2Ez8q2M',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'WOEXv3xikbQ',
                },
            },
        ],
    },
    {
        name: 'Assign value for Oritavancin_Susceptible',
        id: 'Xk1Q9EGlEBi',
        condition:
            "(values['v4znitWGFyi'] <= 0.12 && values['v4znitWGFyi'] != '') ",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'l3R6bUExD36',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'xzsjJxKV4KR',
                },
            },
        ],
    },
    {
        name: 'Assign value for Voriconazole_Susceptible',
        id: 'AaTQvrMKO8D',
        condition:
            "(values['nd0GPkFGNsN'] <= 17 && values['TSuE4UQ749K'] == '' && values['nd0GPkFGNsN'] != '') || (values['TSuE4UQ749K'] >= 0.025 && values['TSuE4UQ749K'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'OXOcsGmSCrX',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'WOEXv3xikbQ',
                },
            },
        ],
    },
    {
        name: 'Assign value for Oritavancin_Susceptible',
        id: 'TrMtbPycJUf',
        condition:
            "(values['v4znitWGFyi'] <= 0.12 && values['v4znitWGFyi'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'pMPR031YwsE',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'xzsjJxKV4KR',
                },
            },
        ],
    },
    {
        name: 'Assign value for Colistin_Intermediate',
        id: 'uR7lxp7ok1J',
        condition:
            "(values['DFZBK5SZEWv'] > 2 && values['DFZBK5SZEWv'] < 4 && values['DFZBK5SZEWv'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'gFugSrlUbOd',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'CrkSOhRJQbn',
                },
            },
        ],
    },
    {
        name: 'Assign value for Oritavancin_Resistant',
        id: 'cri4brrkIPH',
        condition:
            "(values['v4znitWGFyi'] >= 0.25 && values['v4znitWGFyi'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'J1bX8n82q0b',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'xzsjJxKV4KR',
                },
            },
        ],
    },
    {
        name: 'Assign value for Colistin_Intermediate',
        id: 'stSYlJK097I',
        condition:
            "(values['DFZBK5SZEWv'] > 2 && values['DFZBK5SZEWv'] < 4 && values['DFZBK5SZEWv'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'VO5nkF8oPCx',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'CrkSOhRJQbn',
                },
            },
        ],
    },
    {
        name: 'Assign value for Oritavancin_Resistant',
        id: 'aUUyslFlIYI',
        condition:
            "(values['v4znitWGFyi'] >= 0.25 && values['v4znitWGFyi'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'NSnNRpNS9JT',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'xzsjJxKV4KR',
                },
            },
        ],
    },
    {
        name: 'Assign value for Clindamycin_Susceptible',
        id: 'LYOk7YVvg0W',
        condition:
            "(values['fqQhGWtrmaJ'] >= 21 && values['SkcqqcG5VxY'] == '' && values['fqQhGWtrmaJ'] != '') || (values['SkcqqcG5VxY'] <= 0.5 && values['SkcqqcG5VxY'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'o5ws1eI3BaF',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'tMlqkDDf0Kb',
                },
            },
        ],
    },
    {
        name: 'Assign value for Oritavancin_Intermediate',
        id: 'tMdY9rgWCfW',
        condition:
            "(values['v4znitWGFyi'] > 0.12 && values['v4znitWGFyi'] < 0.25 && values['v4znitWGFyi'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'UaFvO6Y22gC',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'xzsjJxKV4KR',
                },
            },
        ],
    },
    {
        name: 'Assign value for Clindamycin_Resistant',
        id: 'HJ3R404DppA',
        condition:
            "(values['fqQhGWtrmaJ'] <= 14 && values['SkcqqcG5VxY'] == '' && values['fqQhGWtrmaJ'] != '') || (values['SkcqqcG5VxY'] >= 4 && values['SkcqqcG5VxY'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'H1NCA0mvQLA',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'tMlqkDDf0Kb',
                },
            },
        ],
    },
    {
        name: 'Assign value for Amikacin_Resistant',
        id: 'w5bXXw6N4Pw',
        condition:
            "(values['VGdJnkTlNyK'] <= 14 && values['GYNpOJWcNx2'] == '' && values['VGdJnkTlNyK'] != '') || (values['GYNpOJWcNx2'] >= 64 && values['GYNpOJWcNx2'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'njih9ZiRrGJ',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'KmgWX65h0iM',
                },
            },
        ],
    },
    {
        name: 'Assign value for Clindamycin_Intermediate',
        id: 'FSlpp246NF8',
        condition:
            "(values['fqQhGWtrmaJ'] > 14 && values['fqQhGWtrmaJ'] < 21 && values['SkcqqcG5VxY'] == '' && values['fqQhGWtrmaJ'] != '') || (values['SkcqqcG5VxY'] > 0.5 && values['SkcqqcG5VxY'] < 4 && values['SkcqqcG5VxY'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'wSiY401J74D',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'tMlqkDDf0Kb',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ofloxacin_Susceptible',
        id: 'S2MWGfuf8C8',
        condition:
            "(values['wkj0efBvthE'] <= 0.12 && values['wkj0efBvthE'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'L6ELCMELsnM',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'UMMQO5G06B8',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacin_Susceptible',
        id: 'TVwoS3XjEis',
        condition:
            "(values['nikrSOx63ce'] >= 21 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] <= 1 && values['f666SCFrjuM'] != '') ",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'B18jL6JYTOS',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ofloxacin_Resistant',
        id: 'eXZM93dLuh1',
        condition:
            " (values['wkj0efBvthE'] >= 2 && values['wkj0efBvthE'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'DCngmCwUWkr',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'UMMQO5G06B8',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacin_Susceptible',
        id: 'UeALKouwa5U',
        condition:
            "(values['nikrSOx63ce'] >= 21 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] <= 1 && values['f666SCFrjuM'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'NyfZCgPo2dH',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ofloxacin_Intermediate',
        id: 'P37ClXErFji',
        condition:
            " (values['wkj0efBvthE'] > 0.12 && values['wkj0efBvthE'] < 2 && values['wkj0efBvthE'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'MwPROBMrfF1',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'UMMQO5G06B8',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacin_Susceptible',
        id: 'wksAvUgHDNU',
        condition:
            "(values['nikrSOx63ce'] >= 21 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] <= 1 && values['f666SCFrjuM'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'NkcN8r380G0',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Norfloxacin_Susceptible',
        id: 'LSBquxr5zXg',
        condition:
            "(values['y0YzPyfZNwb'] >= 17 && values['NBHJLVnacXh'] == '' && values['y0YzPyfZNwb'] != '') || (values['NBHJLVnacXh'] <= 4 && values['NBHJLVnacXh'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'Bq3CpS8MGNA',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 't5F5a4BMy00',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacin_Susceptible',
        id: 'kVByHVU84i5',
        condition:
            "(values['nikrSOx63ce'] >= 31 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] <= 1 && values['f666SCFrjuM'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'D1EXrHSjL7w',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Norfloxacin_Resistant',
        id: 'xZTfPY0VgB8',
        condition:
            "(values['y0YzPyfZNwb'] <= 12 && values['NBHJLVnacXh'] == '' && values['y0YzPyfZNwb'] != '') || (values['NBHJLVnacXh'] >= 16 && values['NBHJLVnacXh'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'AEDSkyoUOI1',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 't5F5a4BMy00',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacin_Susceptible',
        id: 'dx9h8a1r1d8',
        condition:
            "(values['nikrSOx63ce'] >= 31 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] <= 0.06 && values['f666SCFrjuM'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'Kar8kE5VXFt',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Norfloxacin_Intermediate',
        id: 'S7vhDkyzE64',
        condition:
            "(values['y0YzPyfZNwb'] > 12 && values['y0YzPyfZNwb'] < 17 && values['NBHJLVnacXh'] == '' && values['y0YzPyfZNwb'] != '') || (values['NBHJLVnacXh'] > 4 && values['NBHJLVnacXh'] < 16 && values['NBHJLVnacXh'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'bKu7rtQfxbn',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 't5F5a4BMy00',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacin_Susceptible',
        id: 'whZ5fPYCfKW',
        condition:
            "(values['nikrSOx63ce'] >= 31 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] <= 0.06 && values['f666SCFrjuM'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'Thuzhp7xtjW',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Nitrofurantoin_Susceptible',
        id: 'X9DUjZCK9YY',
        condition:
            "(values['vRWArSA8urW'] >= 17 && values['U7nHovss4xK'] == '' && values['vRWArSA8urW'] != '') || (values['U7nHovss4xK'] <= 32 && values['U7nHovss4xK'] != '') ",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'UM2gy5jzHij',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'heyrUXjYYcP',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacin_Resistant',
        id: 'KUD4EFbiQBq',
        condition:
            "(values['nikrSOx63ce'] <= 15 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] >= 4 && values['f666SCFrjuM'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'o35BZ2twVXp',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Nitrofurantoin_Susceptible',
        id: 'AyDOPCLihjm',
        condition:
            "(values['vRWArSA8urW'] >= 17 && values['U7nHovss4xK'] == '' && values['vRWArSA8urW'] != '') || (values['U7nHovss4xK'] <= 32 && values['U7nHovss4xK'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'LkQJNpdMogc',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'heyrUXjYYcP',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacin_Resistant',
        id: 'ubY9UUmr9Kg',
        condition:
            "(values['nikrSOx63ce'] <= 15 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] >= 4 && values['f666SCFrjuM'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'fYDh6gXJhBU',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Nitrofurantoin_Resistant',
        id: 'rZFn6S7f7ep',
        condition:
            "(values['vRWArSA8urW'] <= 14 && values['U7nHovss4xK'] == '' && values['vRWArSA8urW'] != '') || (values['U7nHovss4xK'] >= 128 && values['U7nHovss4xK'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'FTQP4WpD6yH',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'heyrUXjYYcP',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacin_Resistant',
        id: 'nN6xbhTypjy',
        condition:
            "(values['nikrSOx63ce'] <= 20 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] >= 4 && values['f666SCFrjuM'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'vKWG7vQqOVn',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Nitrofurantoin_Resistant',
        id: 'dqmNMmWEPig',
        condition:
            "(values['vRWArSA8urW'] <= 14 && values['U7nHovss4xK'] == '' && values['vRWArSA8urW'] != '') || (values['U7nHovss4xK'] >= 128 && values['U7nHovss4xK'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'xr41ndOF7Sw',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'heyrUXjYYcP',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacin_Resistant',
        id: 'os1UnVnJz0Q',
        condition:
            "(values['nikrSOx63ce'] <= 20 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] >= 1 && values['f666SCFrjuM'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'WDVw7q6eiBm',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Nitrofurantoin_Intermediate',
        id: 'ScMSJGvcEtU',
        condition:
            "(values['vRWArSA8urW'] > 14 && values['vRWArSA8urW'] < 17 && values['U7nHovss4xK'] == '' && values['vRWArSA8urW'] != '') || (values['U7nHovss4xK'] > 32 && values['U7nHovss4xK'] < 128 && values['U7nHovss4xK'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'yDgiLlWh18C',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'heyrUXjYYcP',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacin_Resistant',
        id: 'ILPcBemh49u',
        condition:
            "(values['nikrSOx63ce'] <= 20 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] >= 1 && values['f666SCFrjuM'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'uP6z7vwXJRu',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Nitrofurantoin_Intermediate',
        id: 'ScwbqvApIFE',
        condition:
            "(values['vRWArSA8urW'] > 14 && values['vRWArSA8urW'] < 17 && values['U7nHovss4xK'] == '' && values['vRWArSA8urW'] != '') || (values['U7nHovss4xK'] > 32 && values['U7nHovss4xK'] < 128 && values['U7nHovss4xK'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'Qt35eBvXhL8',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'heyrUXjYYcP',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacin_Intermediate',
        id: 'a6M0hV8Tzsc',
        condition:
            "(values['nikrSOx63ce'] > 15 && values['nikrSOx63ce'] < 21 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] > 1 && values['f666SCFrjuM'] < 4 && values['f666SCFrjuM'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'oQYSpm2jNp7',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Nalidixic acid_Susceptible',
        id: 'ZRt08swOTw9',
        condition:
            "(values['yC1igYd2Cnl'] >= 19 && values['DMb8qoZPnnZ'] == '' && values['yC1igYd2Cnl'] != '') || (values['DMb8qoZPnnZ'] <= 16 && values['DMb8qoZPnnZ'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'hPE7KPx5krv',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'bgIMdy70X2z',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacin_Intermediate',
        id: 'PNtjwIImOqE',
        condition:
            "(values['nikrSOx63ce'] > 15 && values['nikrSOx63ce'] < 21 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] > 1 && values['f666SCFrjuM'] < 4 && values['f666SCFrjuM'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'GpYGGISpUPN',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Nalidixic acid_Resistant',
        id: 'CbE7hxlZBRc',
        condition:
            "(values['yC1igYd2Cnl'] <= 13 && values['DMb8qoZPnnZ'] == '' && values['yC1igYd2Cnl'] != '') || (values['DMb8qoZPnnZ'] >= 32 && values['DMb8qoZPnnZ'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'IBLRqLwaLpx',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'bgIMdy70X2z',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacin_Intermediate',
        id: 'kgtbGIZaddl',
        condition:
            "(values['nikrSOx63ce'] > 15 && values['nikrSOx63ce'] < 21 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] > 1 && values['f666SCFrjuM'] < 4 && values['f666SCFrjuM'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'XEpCJVDuyfa',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Nalidixic acid_Intermediate',
        id: 'e4h7JzbSx8v',
        condition:
            "(values['yC1igYd2Cnl'] > 13 && values['yC1igYd2Cnl'] < 19 && values['DMb8qoZPnnZ'] == '' && values['yC1igYd2Cnl'] != '') || (values['DMb8qoZPnnZ'] > 16 && values['DMb8qoZPnnZ'] < 32 && values['DMb8qoZPnnZ'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'dj4Bv1AbH3D',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'bgIMdy70X2z',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacin_Intermediate',
        id: 'RI5S1GNtWuW',
        condition:
            "(values['nikrSOx63ce'] > 20 && values['nikrSOx63ce'] < 31 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] > 4 && values['f666SCFrjuM'] < 1 && values['f666SCFrjuM'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'drL4kETTAwW',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Mupirocin High Level_Susceptible',
        id: 'n2J4WhDL45F',
        condition:
            "(values['AGX90gKwEP8'] >= 8 && values['t4gMYpWynRp'] == '' && values['AGX90gKwEP8'] != '') || (values['t4gMYpWynRp'] <= 512 && values['t4gMYpWynRp'] != '') ",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'HXQ1sd70Rg6',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'EQG0rzJu3Rd',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacin_Intermediate',
        id: 'gdVYeiX4dUx',
        condition:
            "(values['nikrSOx63ce'] > 20 && values['nikrSOx63ce'] < 31 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] > 0.06 && values['f666SCFrjuM'] < 1 && values['f666SCFrjuM'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'YU9nMlp76x2',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Mupirocin High Level_Resistant',
        id: 'IwHoTyYpugq',
        condition:
            "(values['AGX90gKwEP8'] <= 7 && values['t4gMYpWynRp'] == '' && values['AGX90gKwEP8'] != '') || (values['t4gMYpWynRp'] >= 512 && values['t4gMYpWynRp'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'tKlKTmnxe8N',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'EQG0rzJu3Rd',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacin_Intermediate',
        id: 'wUcseippqE3',
        condition:
            "(values['nikrSOx63ce'] > 20 && values['nikrSOx63ce'] < 31 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] > 0.06 && values['f666SCFrjuM'] < 1 && values['f666SCFrjuM'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'aGrlegH8iPE',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Mupirocin High Level_Intermediate',
        id: 'fzNEdj2XOUQ',
        condition:
            "(values['AGX90gKwEP8'] > 7 && values['AGX90gKwEP8'] < 8 && values['t4gMYpWynRp'] == '' && values['AGX90gKwEP8'] != '') || (values['t4gMYpWynRp'] > 256 && values['t4gMYpWynRp'] < 512 && values['t4gMYpWynRp'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'LIkwGjnGLtp',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'EQG0rzJu3Rd',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ciprofloxacine_Resistant',
        id: 'g2DAAFV6AmB',
        condition:
            "(values['nikrSOx63ce'] <= 15 && values['f666SCFrjuM'] == '' && values['nikrSOx63ce'] != '') || (values['f666SCFrjuM'] >= 4 && values['f666SCFrjuM'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'yZ0rs0mJQkN',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'tapnaxXHuz5',
                },
            },
        ],
    },
    {
        name: 'Assign value for Minocycline_Susceptible',
        id: 'M6cbRAF9KbB',
        condition:
            "(values['uTDnkccqS9Z'] >= 19 && values['bBm12emFnsV'] == '' && values['uTDnkccqS9Z'] != '') || (values['bBm12emFnsV'] <= 4 && values['bBm12emFnsV'] != '') ",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'hhs7WCTp1O7',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'EeQmaEadxbe',
                },
            },
        ],
    },
    {
        name: 'Assign value for Chloramphenicol_Susceptible',
        id: 'Ju6vJUsaFSl',
        condition:
            "(values['jL3eD3wbnot'] >= 18 && values['gnjCD7h8Dm8'] == '' && values['jL3eD3wbnot'] != '') || (values['gnjCD7h8Dm8'] <= 8 && values['gnjCD7h8Dm8'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'gHZu2xzfcgL',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'zUb9jAQSFn8',
                },
            },
        ],
    },
    {
        name: 'Assign value for Minocycline_Resistant',
        id: 'tRcluydEzNx',
        condition:
            "(values['uTDnkccqS9Z'] <= 14 && values['bBm12emFnsV'] == '' && values['uTDnkccqS9Z'] != '') || (values['bBm12emFnsV'] >= 16 && values['bBm12emFnsV'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'iccUBN56PGF',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'EeQmaEadxbe',
                },
            },
        ],
    },
    {
        name: 'Assign value for Chloramphenicol_Susceptible',
        id: 'yvVkOJ5H5dS',
        condition:
            "(values['gnjCD7h8Dm8'] <= 8 && values['gnjCD7h8Dm8'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'buYqnlXWFPr',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'zUb9jAQSFn8',
                },
            },
        ],
    },
    {
        name: 'Assign value for Minocycline_Intermediate',
        id: 'AfcoZ8HDygJ',
        condition:
            "(values['uTDnkccqS9Z'] > 14 && values['uTDnkccqS9Z'] < 19 && values['bBm12emFnsV'] == '' && values['uTDnkccqS9Z'] != '') || (values['bBm12emFnsV'] > 4 && values['bBm12emFnsV'] < 16 && values['bBm12emFnsV'] != '') ",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'u7F7JB22WOJ',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'EeQmaEadxbe',
                },
            },
        ],
    },
    {
        name: 'Assign value for Chloramphenicol_Susceptible',
        id: 'MfPrasCnTwe',
        condition:
            "(values['jL3eD3wbnot'] >= 18 && values['gnjCD7h8Dm8'] == '' && values['jL3eD3wbnot'] != '') || (values['gnjCD7h8Dm8'] <= 8 && values['gnjCD7h8Dm8'] != '') ",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'xGCAOHOM97B',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'zUb9jAQSFn8',
                },
            },
        ],
    },
    {
        name: 'Assign value for Micafungin_Susceptible',
        id: 't76CW20UVSl',
        condition:
            "(values['UYgQYMNvpkW'] >= 0.25 && values['UYgQYMNvpkW'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'QUGQ4gDNfe6',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'W2IsLxG0Ors',
                },
            },
        ],
    },
    {
        name: 'Assign value for Chloramphenicol_Resistant',
        id: 'L8FgurPtyoq',
        condition:
            "(values['jL3eD3wbnot'] <= 12 && values['gnjCD7h8Dm8'] == '' && values['jL3eD3wbnot'] != '') || (values['gnjCD7h8Dm8'] >= 32 && values['gnjCD7h8Dm8'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'ix6dhmIUold',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'zUb9jAQSFn8',
                },
            },
        ],
    },
    {
        name: 'Assign value for Micafungin_Resistant',
        id: 'aBxNkCstWAu',
        condition:
            "(values['UYgQYMNvpkW'] >= 1 && values['UYgQYMNvpkW'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'TmmiObQWixI',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'W2IsLxG0Ors',
                },
            },
        ],
    },
    {
        name: 'Assign value for Chloramphenicol_Resistant',
        id: 'uhbDkWQEWKA',
        condition:
            "(values['gnjCD7h8Dm8'] >= 32 && values['gnjCD7h8Dm8'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'RdZe5KBrC2F',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'zUb9jAQSFn8',
                },
            },
        ],
    },
    {
        name: 'Assign value for Micafungin_Intermediate',
        id: 'caj3sYEuskc',
        condition:
            "(values['UYgQYMNvpkW'] > 0.25 && values['UYgQYMNvpkW'] < 1 && values['UYgQYMNvpkW'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'J5eIr5FclqM',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'W2IsLxG0Ors',
                },
            },
        ],
    },
    {
        name: 'Assign value for Chloramphenicol_Resistant',
        id: 'UQTqSI3VNwv',
        condition:
            "(values['jL3eD3wbnot'] <= 12 && values['gnjCD7h8Dm8'] == '' && values['jL3eD3wbnot'] != '') || (values['gnjCD7h8Dm8'] >= 32 && values['gnjCD7h8Dm8'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'QvpD9QUVRZK',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'zUb9jAQSFn8',
                },
            },
        ],
    },
    {
        name: 'Assign value for Meropenem_Susceptible',
        id: 'aGZeTk1vypO',
        condition:
            "(values['vX1XAmSKfxx'] >= 23 && values['S5dYjuVXvgZ'] == '' && values['vX1XAmSKfxx'] != '') || (values['S5dYjuVXvgZ'] <= 1 && values['S5dYjuVXvgZ'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'Z8coTdhnYrN',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'kQdkrguULKu',
                },
            },
        ],
    },
    {
        name: 'Assign value for Chloramphenicol_Intermediate',
        id: 'voYnEBsC80T',
        condition:
            "(values['jL3eD3wbnot'] > 12 && values['jL3eD3wbnot'] < 18 && values['gnjCD7h8Dm8'] == '' && values['jL3eD3wbnot'] != '') || (values['gnjCD7h8Dm8'] > 8 && values['gnjCD7h8Dm8'] < 32 && values['gnjCD7h8Dm8'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'K2hrnr8n5Jo',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'zUb9jAQSFn8',
                },
            },
        ],
    },
    {
        name: 'Assign value for Meropenem_Susceptible',
        id: 's2gIzwel3em',
        condition:
            "(values['vX1XAmSKfxx'] >= 19 && values['S5dYjuVXvgZ'] == '' && values['vX1XAmSKfxx'] != '') || (values['S5dYjuVXvgZ'] <= 2 && values['S5dYjuVXvgZ'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'H7cQcPtUF99',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'kQdkrguULKu',
                },
            },
        ],
    },
    {
        name: 'Assign value for Chloramphenicol_Intermediate',
        id: 'hc6aWs2ME5H',
        condition:
            "(values['jL3eD3wbnot'] > 12 && values['jL3eD3wbnot'] < 18 && values['gnjCD7h8Dm8'] == '' && values['jL3eD3wbnot'] != '') || (values['gnjCD7h8Dm8'] > 8 && values['gnjCD7h8Dm8'] < 32 && values['gnjCD7h8Dm8'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'PRYXCF2DdfX',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'zUb9jAQSFn8',
                },
            },
        ],
    },
    {
        name: 'Assign value for Meropenem_Resistant',
        id: 'n1nShOMcd1p',
        condition:
            "(values['vX1XAmSKfxx'] <= 19 && values['S5dYjuVXvgZ'] == '' && values['vX1XAmSKfxx'] != '') || (values['S5dYjuVXvgZ'] >= 4 && values['S5dYjuVXvgZ'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'vqxGTuiJJZ9',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'kQdkrguULKu',
                },
            },
        ],
    },
    {
        name: 'Assign value for Chloramphenicol_Intermediate',
        id: 'kygxWfBcvob',
        condition:
            "(values['gnjCD7h8Dm8'] > 8 && values['gnjCD7h8Dm8'] < 32 && values['gnjCD7h8Dm8'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'sfednJqBUEq',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'zUb9jAQSFn8',
                },
            },
        ],
    },
    {
        name: 'Assign value for Meropenem_Resistant',
        id: 'D9Tb1C3k8BH',
        condition:
            "(values['vX1XAmSKfxx'] <= 15 && values['S5dYjuVXvgZ'] == '' && values['vX1XAmSKfxx'] != '') || (values['S5dYjuVXvgZ'] >= 8 && values['S5dYjuVXvgZ'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'BXK3Jey4zXl',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'kQdkrguULKu',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ceftriaxone_Susceptible',
        id: 'MgsU6j7TeZt',
        condition:
            "(values['VPc74RPVP4K'] >= 23 && values['OW7Hm6tlWik'] == '' && values['VPc74RPVP4K'] != '') || (values['OW7Hm6tlWik'] <= 1 && values['OW7Hm6tlWik'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'sd3DDdYJGyu',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'qkje2xBlwAv',
                },
            },
        ],
    },
    {
        name: 'Assign value for Meropenem_Intermediate',
        id: 'zLxvrNjwbZf',
        condition:
            "(values['vX1XAmSKfxx'] > 19 && values['vX1XAmSKfxx'] < 23 && values['S5dYjuVXvgZ'] == '' && values['vX1XAmSKfxx'] != '') || (values['S5dYjuVXvgZ'] > 1 && values['S5dYjuVXvgZ'] < 4 && values['S5dYjuVXvgZ'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'C8fyvKCrwYm',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'kQdkrguULKu',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ceftriaxone_Resistant',
        id: 'i0j6U37fC6z',
        condition:
            "(values['VPc74RPVP4K'] <= 19 && values['OW7Hm6tlWik'] == '' && values['VPc74RPVP4K'] != '') || (values['OW7Hm6tlWik'] >= 4 && values['OW7Hm6tlWik'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'NXMmCGdekTC',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'qkje2xBlwAv',
                },
            },
        ],
    },
    {
        name: 'Assign value for Meropenem_Intermediate',
        id: 'RPU4baQaH6e',
        condition:
            "(values['vX1XAmSKfxx'] > 15 && values['vX1XAmSKfxx'] < 19 && values['S5dYjuVXvgZ'] == '' && values['vX1XAmSKfxx'] != '') || (values['S5dYjuVXvgZ'] > 2 && values['S5dYjuVXvgZ'] < 8 && values['S5dYjuVXvgZ'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'Uf5JuivFE8N',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'kQdkrguULKu',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ceftriaxone_Intermediate',
        id: 'eECE6iWalDE',
        condition:
            "(values['VPc74RPVP4K'] > 19 && values['VPc74RPVP4K'] < 23 && values['OW7Hm6tlWik'] == '' && values['VPc74RPVP4K'] != '') || (values['OW7Hm6tlWik'] > 1 && values['OW7Hm6tlWik'] < 4 && values['OW7Hm6tlWik'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'TGukXRRTdIZ',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'qkje2xBlwAv',
                },
            },
        ],
    },
    {
        name: 'Assign value for Linezolid_Susceptible',
        id: 'bl4qGF5Rk1R',
        condition:
            "(values['i9UVYE6KfMc'] >= 23 && values['XnpQNv3UjES'] == '' && values['i9UVYE6KfMc'] != '') || (values['XnpQNv3UjES'] <= 2 && values['XnpQNv3UjES'] != '') ",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'VZC6HY63ZNu',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'Dv4xMfbGkNr',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ceftazidime_Susceptible',
        id: 'V7Z0O9XIFas',
        condition:
            "(values['AW75JSOPNZh'] >= 18 && values['eW0PzKIfMSn'] == '' && values['AW75JSOPNZh'] != '') || (values['eW0PzKIfMSn'] <= 8 && values['eW0PzKIfMSn'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'mNDg4M9utBT',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'di11o1M6VkO',
                },
            },
        ],
    },
    {
        name: 'Assign value for Linezolid_Susceptible',
        id: 'TxAEIszmtrL',
        condition:
            "(values['i9UVYE6KfMc'] >= 21 && values['XnpQNv3UjES'] == '' && values['i9UVYE6KfMc'] != '') || (values['XnpQNv3UjES'] <= 4 && values['XnpQNv3UjES'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'fmnjiyXYBHD',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'Dv4xMfbGkNr',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ceftazidime_Susceptible',
        id: 'xvvvPq8lKb3',
        condition:
            "(values['AW75JSOPNZh'] >= 21 && values['eW0PzKIfMSn'] == '' && values['AW75JSOPNZh'] != '') || (values['eW0PzKIfMSn'] <= 4 && values['eW0PzKIfMSn'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'Ec2ztLwemVM',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'di11o1M6VkO',
                },
            },
        ],
    },
    {
        name: 'Assign value for Linezolid_Resistant',
        id: 'YXhDB73J01T',
        condition:
            "(values['i9UVYE6KfMc'] <= 20 && values['XnpQNv3UjES'] == '' && values['i9UVYE6KfMc'] != '') || (values['XnpQNv3UjES'] >= 8 && values['XnpQNv3UjES'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'Y97kYSNJYMJ',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'Dv4xMfbGkNr',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ceftazidime_Resistant',
        id: 'HTHUC3f8u6S',
        condition:
            "(values['AW75JSOPNZh'] <= 14 && values['eW0PzKIfMSn'] == '' && values['AW75JSOPNZh'] != '') || (values['eW0PzKIfMSn'] >= 32 && values['eW0PzKIfMSn'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'Wj5uOWBGkUp',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'di11o1M6VkO',
                },
            },
        ],
    },
    {
        name: 'Assign value for Linezolid_Resistant',
        id: 'CSFLLDMAK6T',
        condition:
            "(values['i9UVYE6KfMc'] <= 20 && values['XnpQNv3UjES'] == '' && values['i9UVYE6KfMc'] != '') || (values['XnpQNv3UjES'] >= 8 && values['XnpQNv3UjES'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'TDTsX8EBSKX',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'Dv4xMfbGkNr',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ceftazidime_Resistant',
        id: 'Q7XdSsZu0lT',
        condition:
            "(values['AW75JSOPNZh'] <= 17 && values['eW0PzKIfMSn'] == '' && values['AW75JSOPNZh'] != '') || (values['eW0PzKIfMSn'] >= 16 && values['eW0PzKIfMSn'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'Y9TDHPL2kBy',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'di11o1M6VkO',
                },
            },
        ],
    },
    {
        name: 'Assign value for Linezolid_Intermediate',
        id: 'p5afkh9fLo9',
        condition:
            "(values['i9UVYE6KfMc'] > 20 && values['i9UVYE6KfMc'] < 23 && values['XnpQNv3UjES'] == '' && values['i9UVYE6KfMc'] != '') || (values['XnpQNv3UjES'] > 2 && values['XnpQNv3UjES'] < 8 && values['XnpQNv3UjES'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'SYdJoES1VtS',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'Dv4xMfbGkNr',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ceftazidime_Intermediate',
        id: 'xB2bkonT19M',
        condition:
            "(values['AW75JSOPNZh'] > 14 && values['AW75JSOPNZh'] < 18 && values['eW0PzKIfMSn'] == '' && values['AW75JSOPNZh'] != '') || (values['eW0PzKIfMSn'] > 8 && values['eW0PzKIfMSn'] < 32 && values['eW0PzKIfMSn'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'TrspBuGZyS4',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'di11o1M6VkO',
                },
            },
        ],
    },
    {
        name: 'Assign value for Linezolid_Intermediate',
        id: 'DV24c05cGpl',
        condition:
            "(values['i9UVYE6KfMc'] > 20 && values['i9UVYE6KfMc'] < 21 && values['XnpQNv3UjES'] == '' && values['i9UVYE6KfMc'] != '') || (values['XnpQNv3UjES'] > 4 && values['XnpQNv3UjES'] < 8 && values['XnpQNv3UjES'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'JLuzBgcs6LB',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'Dv4xMfbGkNr',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ceftazidime_Intermediate',
        id: 'pBJYTf9kaS9',
        condition:
            "(values['AW75JSOPNZh'] > 17 && values['AW75JSOPNZh'] < 21 && values['eW0PzKIfMSn'] == '' && values['AW75JSOPNZh'] != '') || (values['eW0PzKIfMSn'] > 4 && values['eW0PzKIfMSn'] < 16 && values['eW0PzKIfMSn'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'gPxQMR6IKwy',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'di11o1M6VkO',
                },
            },
        ],
    },
    {
        name: 'Assign value for Levofloxacin_Susceptible',
        id: 'Y0toaSl7e6a',
        condition:
            "(values['E7EyQm7euHu'] >= 17 && values['f3R5QjfaCMc'] == '' && values['E7EyQm7euHu'] != '') || (values['f3R5QjfaCMc'] <= 2 && values['f3R5QjfaCMc'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'UdR8BWaUZED',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'oGYzzGCDmze',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefoxitin_Susceptible',
        id: 'pqM1ZEA0GKC',
        condition:
            "(values['FVjeBMIIEqn'] >= 25 && values['luj4jZNXRjB'] == '' && values['FVjeBMIIEqn'] != '') || (values['luj4jZNXRjB'] <= 4 && values['luj4jZNXRjB'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'pNDN5S46C6w',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'mQf4Efd5uVE',
                },
            },
        ],
    },
    {
        name: 'Assign value for Levofloxacin_Susceptible',
        id: 'nun06z6U9cT',
        condition:
            "(values['E7EyQm7euHu'] >= 17 && values['f3R5QjfaCMc'] == '' && values['E7EyQm7euHu'] != '') || (values['f3R5QjfaCMc'] <= 2 && values['f3R5QjfaCMc'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'LXVkO5sk4Pg',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'oGYzzGCDmze',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefoxitin_Resistant',
        id: 'p8VSliqL5m9',
        condition:
            "(values['FVjeBMIIEqn'] <= 24 && values['luj4jZNXRjB'] == '' && values['FVjeBMIIEqn'] != '') || (values['luj4jZNXRjB'] >= 8 && values['luj4jZNXRjB'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'B0V2YCg8IKV',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'mQf4Efd5uVE',
                },
            },
        ],
    },
    {
        name: 'Assign value for Levofloxacin_Susceptible',
        id: 'AVXZlOi5kiu',
        condition:
            " (values['f3R5QjfaCMc'] <= 0.12 && values['f3R5QjfaCMc'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'Fx6UiTWNgCG',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'oGYzzGCDmze',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefoxitin_Intermediate',
        id: 'wvhMO9nLaNw',
        condition:
            "(values['FVjeBMIIEqn'] > 24 && values['FVjeBMIIEqn'] < 25 && values['luj4jZNXRjB'] == '' && values['FVjeBMIIEqn'] != '') || (values['luj4jZNXRjB'] > 4 && values['luj4jZNXRjB'] < 8 && values['luj4jZNXRjB'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'MGDbWezprwM',
                programRuleActionType: 'ASSIGN',
                dataElement: {
                    id: 'mQf4Efd5uVE',
                },
            },
        ],
    },
    {
        name: 'Assign value for Levofloxacin_Resistant',
        id: 'XEGmvTpooEc',
        condition:
            "(values['E7EyQm7euHu'] <= 13 && values['f3R5QjfaCMc'] == '' && values['E7EyQm7euHu'] != '') || (values['f3R5QjfaCMc'] >= 8 && values['f3R5QjfaCMc'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'xgBb4draTgw',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'oGYzzGCDmze',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefotaxime_Susceptible',
        id: 'HNEiYAL7tSP',
        condition:
            "(values['lpWR8ZSa1zC'] >= 26 && values['uiMdxS6pvHt'] == '' && values['lpWR8ZSa1zC'] != '') || (values['uiMdxS6pvHt'] <= 1 && values['uiMdxS6pvHt'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'cTUrh0lbNIc',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'cPYspBpRsuQ',
                },
            },
        ],
    },
    {
        name: 'Assign value for Levofloxacin_Resistant',
        id: 'U37TGJ2JtQ9',
        condition:
            "(values['E7EyQm7euHu'] <= 13 && values['f3R5QjfaCMc'] == '' && values['E7EyQm7euHu'] != '') || (values['f3R5QjfaCMc'] >= 8 && values['f3R5QjfaCMc'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'k1BMEF0AFvW',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'oGYzzGCDmze',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefotaxime_Resistant',
        id: 'iCZjAxyU9RG',
        condition:
            "(values['lpWR8ZSa1zC'] <= 22 && values['uiMdxS6pvHt'] == '' && values['lpWR8ZSa1zC'] != '') || (values['uiMdxS6pvHt'] >= 4 && values['uiMdxS6pvHt'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'J53Hx6qqrWY',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'cPYspBpRsuQ',
                },
            },
        ],
    },
    {
        name: 'Assign value for Levofloxacin_Resistant',
        id: 'J8hjc3mYg9R',
        condition:
            " (values['f3R5QjfaCMc'] >= 2 && values['f3R5QjfaCMc'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'd46oQWZOtOW',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'oGYzzGCDmze',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefotaxime_Intermediate',
        id: 'wjfyWkzgtau',
        condition:
            "(values['lpWR8ZSa1zC'] > 22 && values['lpWR8ZSa1zC'] < 26 && values['uiMdxS6pvHt'] == '' && values['lpWR8ZSa1zC'] != '') || (values['uiMdxS6pvHt'] > 1 && values['uiMdxS6pvHt'] < 4 && values['uiMdxS6pvHt'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'SD5abA41TEI',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'cPYspBpRsuQ',
                },
            },
        ],
    },
    {
        name: 'Assign value for Levofloxacin_Intermediate',
        id: 'CbwUy6jFeZw',
        condition:
            "(values['E7EyQm7euHu'] > 13 && values['E7EyQm7euHu'] < 17 && values['f3R5QjfaCMc'] == '' && values['E7EyQm7euHu'] != '') || (values['f3R5QjfaCMc'] > 2 && values['f3R5QjfaCMc'] < 8 && values['f3R5QjfaCMc'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'vfTAo1BVtwi',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'oGYzzGCDmze',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefixime_Susceptible',
        id: 'mohATkRPqWg',
        condition:
            "(values['YevRvdwsL3o'] >= 19 && values['OW7Hm6tlWik'] == '' && values['YevRvdwsL3o'] != '') || (values['OW7Hm6tlWik'] <= 1 && values['OW7Hm6tlWik'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'JuNGAVZIEhY',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'NvEaW4yvDpz',
                },
            },
        ],
    },
    {
        name: 'Assign value for Levofloxacin_Intermediate',
        id: 'pBJ20ew29dP',
        condition:
            "(values['E7EyQm7euHu'] > 13 && values['E7EyQm7euHu'] < 17 && values['f3R5QjfaCMc'] == '' && values['E7EyQm7euHu'] != '') || (values['f3R5QjfaCMc'] > 2 && values['f3R5QjfaCMc'] < 8 && values['f3R5QjfaCMc'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'zM0RtwCiGxT',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'oGYzzGCDmze',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefixime_Susceptible',
        id: 'TEQ9EQ89BtM',
        condition:
            "(values['YevRvdwsL3o'] >= 19 && values['OW7Hm6tlWik'] == '' && values['YevRvdwsL3o'] != '') || (values['OW7Hm6tlWik'] <= 1 && values['OW7Hm6tlWik'] != '') ",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'Cck5Yepfb1h',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'NvEaW4yvDpz',
                },
            },
        ],
    },
    {
        name: 'Assign value for Levofloxacin_Intermediate',
        id: 'FL3zEXQu6ZU',
        condition:
            "(values['f3R5QjfaCMc'] > 0.12 && values['f3R5QjfaCMc'] < 2 && values['f3R5QjfaCMc'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'bJg95CnBttr',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'oGYzzGCDmze',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefixime_Resistant',
        id: 'oLa0LWHWEbo',
        condition:
            "(values['YevRvdwsL3o'] <= 15 && values['OW7Hm6tlWik'] == '' && values['YevRvdwsL3o'] != '') || (values['OW7Hm6tlWik'] >= 4 && values['OW7Hm6tlWik'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'DP3FHy59Jks',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'NvEaW4yvDpz',
                },
            },
        ],
    },
    {
        name: 'Assign value for Itraconazole_Susceptible',
        id: 'ZLkSdIWzd7Y',
        condition:
            "(values['wbKF56To77p'] <= 17 && values['G5g9qxaItEc'] == '' && values['wbKF56To77p'] != '') || (values['G5g9qxaItEc'] >= 1 && values['G5g9qxaItEc'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'bUoJ5OP1GGJ',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'JCuTkhsL29K',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefixime_Resistant',
        id: 'VcyW5Ab0bTE',
        condition:
            "(values['YevRvdwsL3o'] <= 15 && values['OW7Hm6tlWik'] == '' && values['YevRvdwsL3o'] != '') || (values['OW7Hm6tlWik'] >= 4 && values['OW7Hm6tlWik'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'PEcoxbAwKed',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'NvEaW4yvDpz',
                },
            },
        ],
    },
    {
        name: 'Assign value for Itraconazole_Resistant',
        id: 'PGsrJnw9RbH',
        condition:
            "(values['wbKF56To77p'] <= 16 && values['G5g9qxaItEc'] == '' && values['wbKF56To77p'] != '') || (values['G5g9qxaItEc'] >= 2 && values['G5g9qxaItEc'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'aAN8BS7oyHa',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'JCuTkhsL29K',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefixime_Intermediate',
        id: 'jsbQs7y6ocl',
        condition:
            "(values['YevRvdwsL3o'] > 15 && values['YevRvdwsL3o'] < 19 && values['OW7Hm6tlWik'] == '' && values['YevRvdwsL3o'] != '') || (values['OW7Hm6tlWik'] > 1 && values['OW7Hm6tlWik'] < 4 && values['OW7Hm6tlWik'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'zOsCHiyJYT1',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'NvEaW4yvDpz',
                },
            },
        ],
    },
    {
        name: 'Assign value for Itraconazole_Intermediate',
        id: 'ZsJpTd2ytfZ',
        condition:
            "(values['wbKF56To77p'] > 16 && values['wbKF56To77p'] < 17 && values['G5g9qxaItEc'] == '' && values['wbKF56To77p'] != '') || (values['G5g9qxaItEc'] > 1 && values['G5g9qxaItEc'] < 2 && values['G5g9qxaItEc'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'cKj8tIN5PiD',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'JCuTkhsL29K',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefixime_Intermediate',
        id: 'KkomfgmGH2m',
        condition:
            "(values['YevRvdwsL3o'] > 15 && values['YevRvdwsL3o'] < 19 && values['OW7Hm6tlWik'] == '' && values['YevRvdwsL3o'] != '') || (values['OW7Hm6tlWik'] > 1 && values['OW7Hm6tlWik'] < 4 && values['OW7Hm6tlWik'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'cWvJmi1ryf9',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'NvEaW4yvDpz',
                },
            },
        ],
    },
    {
        name: 'Assign value for Imipenem_Susceptible',
        id: 'TZffRflxX4T',
        condition:
            "(values['fOmuusloF7k'] >= 23 && values['f0vYwlbsdQA'] == '' && values['fOmuusloF7k'] != '') || (values['f0vYwlbsdQA'] <= 1 && values['f0vYwlbsdQA'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'TPLMRgkpgxb',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'WpEHYngpFoy',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefepime_Susceptible',
        id: 'o1tz8EBGvV4',
        condition:
            "(values['ComY5zACdjQ'] >= 18 && values['aTWISEtdC9C'] == '' && values['ComY5zACdjQ'] != '') || (values['aTWISEtdC9C'] <= 8 && values['aTWISEtdC9C'] != '') ",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'RleECYTNMOf',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'v4Ev47UKraq',
                },
            },
        ],
    },
    {
        name: 'Assign value for Imipenem_Susceptible',
        id: 'q0MMkczrzhc',
        condition:
            "(values['fOmuusloF7k'] >= 19 && values['f0vYwlbsdQA'] == '' && values['fOmuusloF7k'] != '') || (values['f0vYwlbsdQA'] <= 2 && values['f0vYwlbsdQA'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'QGBBS7sbKU1',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'WpEHYngpFoy',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefepime_Resistant',
        id: 'Jei8pLa5qi0',
        condition:
            "(values['ComY5zACdjQ'] <= 14 && values['aTWISEtdC9C'] == '' && values['ComY5zACdjQ'] != '') || (values['aTWISEtdC9C'] >= 32 && values['aTWISEtdC9C'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'mfAK48hbA9X',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'v4Ev47UKraq',
                },
            },
        ],
    },
    {
        name: 'Assign value for Imipenem_Resistant',
        id: 'zLBE1yuvuBF',
        condition:
            "(values['fOmuusloF7k'] <= 19 && values['f0vYwlbsdQA'] == '' && values['fOmuusloF7k'] != '') || (values['f0vYwlbsdQA'] >= 4 && values['f0vYwlbsdQA'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'BiInknQSCgt',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'WpEHYngpFoy',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefepime_Intermediate',
        id: 'efNiIcr1zG3',
        condition:
            "(values['ComY5zACdjQ'] > 14 && values['ComY5zACdjQ'] < 18 && values['aTWISEtdC9C'] == '' && values['ComY5zACdjQ'] != '') || (values['aTWISEtdC9C'] > 8 && values['aTWISEtdC9C'] < 32 && values['aTWISEtdC9C'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'hJxk9eONn4B',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'v4Ev47UKraq',
                },
            },
        ],
    },
    {
        name: 'Assign value for Imipenem_Resistant',
        id: 'CMLXAL6W5Hi',
        condition:
            "(values['fOmuusloF7k'] <= 15 && values['f0vYwlbsdQA'] == '' && values['fOmuusloF7k'] != '') || (values['f0vYwlbsdQA'] >= 8 && values['f0vYwlbsdQA'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'urhJfhFg2Zt',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'WpEHYngpFoy',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefazolin_Susceptible',
        id: 'JGQoScS7OsR',
        condition:
            "(values['SZJuj0AmGxB'] >= 15 && values['lQYcD2hTocV'] == '' && values['SZJuj0AmGxB'] != '') || (values['lQYcD2hTocV'] <= 16 && values['lQYcD2hTocV'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'PhoSk4rR5zj',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'AC3ZDhUyjDX',
                },
            },
        ],
    },
    {
        name: 'Assign value for Imipenem_Intermediate',
        id: 'DtowHGzqef5',
        condition:
            "(values['fOmuusloF7k'] > 19 && values['fOmuusloF7k'] < 23 && values['f0vYwlbsdQA'] == '' && values['fOmuusloF7k'] != '') || (values['f0vYwlbsdQA'] > 1 && values['f0vYwlbsdQA'] < 4 && values['f0vYwlbsdQA'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'FGlbImsaRua',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'WpEHYngpFoy',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefazolin_Resistant',
        id: 'LCTdTf2Dvi6',
        condition:
            "(values['SZJuj0AmGxB'] <= 14 && values['lQYcD2hTocV'] == '' && values['SZJuj0AmGxB'] != '') || (values['lQYcD2hTocV'] >= 32 && values['lQYcD2hTocV'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'KnmCSZN4jML',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'AC3ZDhUyjDX',
                },
            },
        ],
    },
    {
        name: 'Assign value for Imipenem_Intermediate',
        id: 'it5jyUVwg96',
        condition:
            "(values['fOmuusloF7k'] > 15 && values['fOmuusloF7k'] < 19 && values['f0vYwlbsdQA'] == '' && values['fOmuusloF7k'] != '') || (values['f0vYwlbsdQA'] > 2 && values['f0vYwlbsdQA'] < 8 && values['f0vYwlbsdQA'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'Id4Joxidh0b',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'WpEHYngpFoy',
                },
            },
        ],
    },
    {
        name: 'Assign value for Cefazolin_Intermediate',
        id: 'yWjFyoEKbdN',
        condition:
            "(values['SZJuj0AmGxB'] > 14 && values['SZJuj0AmGxB'] < 15 && values['lQYcD2hTocV'] == '' && values['SZJuj0AmGxB'] != '') || (values['lQYcD2hTocV'] > 16 && values['lQYcD2hTocV'] < 32 && values['lQYcD2hTocV'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'VbXDZuJoWAV',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'AC3ZDhUyjDX',
                },
            },
        ],
    },
    {
        name: 'Assign value for Gentamicin_Susceptible',
        id: 'HR9yYq1BTVp',
        condition:
            "(values['FI1TVmmpjh9'] >= 15 && values['HISVzNoIL07'] == '' && values['FI1TVmmpjh9'] != '') || (values['HISVzNoIL07'] <= 4 && values['HISVzNoIL07'] != '') ",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'POH1DInnPCV',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'NHwYKsfbcx3',
                },
            },
        ],
    },
    {
        name: 'Assign value for Caspofungin_Susceptible',
        id: 'uVf1zZaGnsj',
        condition:
            "(values['sgzWFcSXWxS'] <= 17 && values['LC3X7WR4XRQ'] == '' && values['sgzWFcSXWxS'] != '') || (values['LC3X7WR4XRQ'] >= 0.25 && values['LC3X7WR4XRQ'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 't4sd64auMv9',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'A60TnvW9biK',
                },
            },
        ],
    },
    {
        name: 'Assign value for Gentamicin_Resistant',
        id: 'CT4Tag3ka9k',
        condition:
            "(values['FI1TVmmpjh9'] <= 12 && values['HISVzNoIL07'] == '' && values['FI1TVmmpjh9'] != '') || (values['HISVzNoIL07'] >= 16 && values['HISVzNoIL07'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'nNMloO1l05q',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'NHwYKsfbcx3',
                },
            },
        ],
    },
    {
        name: 'Assign value for Caspofungin_Resistant',
        id: 'H2wlT3lQWm7',
        condition:
            "(values['sgzWFcSXWxS'] <= 14 && values['LC3X7WR4XRQ'] == '' && values['sgzWFcSXWxS'] != '') || (values['LC3X7WR4XRQ'] >= 1 && values['LC3X7WR4XRQ'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'BxpAwXMGCFq',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'A60TnvW9biK',
                },
            },
        ],
    },
    {
        name: 'Assign value for Gentamicin_Intermediate',
        id: 'aBwkRyOH3dC',
        condition:
            "(values['FI1TVmmpjh9'] > 12 && values['FI1TVmmpjh9'] < 15 && values['HISVzNoIL07'] == '' && values['FI1TVmmpjh9'] != '') || (values['HISVzNoIL07'] > 4 && values['HISVzNoIL07'] < 16 && values['HISVzNoIL07'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'lPsrps66jll',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'NHwYKsfbcx3',
                },
            },
        ],
    },
    {
        name: 'Assign value for Caspofungin_Intermediate',
        id: 'O1YpKwaeOAM',
        condition:
            "(values['sgzWFcSXWxS'] > 14 && values['sgzWFcSXWxS'] < 17 && values['LC3X7WR4XRQ'] == '' && values['sgzWFcSXWxS'] != '') || (values['LC3X7WR4XRQ'] > 0.25 && values['LC3X7WR4XRQ'] < 1 && values['LC3X7WR4XRQ'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'MC7FtGBFfpr',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'A60TnvW9biK',
                },
            },
        ],
    },
    {
        name: 'Assign value for Gentamicin HL_Susceptible',
        id: 'OeMZucZfHJL',
        condition:
            "(values['fbfJO2u7vnf'] >= 10 && values['y9r6wFWWFgl'] == '' && values['fbfJO2u7vnf'] != '') || (values['y9r6wFWWFgl'] <= 500 && values['y9r6wFWWFgl'] != '') ",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'PHLjaQTBr84',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'Ws4xKP2lqIp',
                },
            },
        ],
    },
    {
        name: 'Assign value for Azithromycin_Susceptible',
        id: 'SAVGxg05ays',
        condition:
            "(values['tDf0wEpy9TM'] >= 13 && values['jxeoAP1naqM'] == '' && values['tDf0wEpy9TM'] != '') || (values['jxeoAP1naqM'] <= 8 && values['jxeoAP1naqM'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'ZjviiyRHBmr',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'MaJBP9K1y79',
                },
            },
        ],
    },
    {
        name: 'Assign value for Gentamicin HL_Resistant',
        id: 'trKKkUxLQN5',
        condition:
            "(values['fbfJO2u7vnf'] <= 6 && values['y9r6wFWWFgl'] == '' && values['fbfJO2u7vnf'] != '') || (values['y9r6wFWWFgl'] >= 1000 && values['y9r6wFWWFgl'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'rsOVLVQfEVP',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'Ws4xKP2lqIp',
                },
            },
        ],
    },
    {
        name: 'Assign value for Azithromycin_Resistant',
        id: 'eU4IH6XX1rO',
        condition:
            "(values['tDf0wEpy9TM'] <= 12 && values['jxeoAP1naqM'] == '' && values['tDf0wEpy9TM'] != '') || (values['jxeoAP1naqM'] >= 32 && values['jxeoAP1naqM'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'sjeJ7buaJtj',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'MaJBP9K1y79',
                },
            },
        ],
    },
    {
        name: 'Assign value for Gentamicin HL_Intermediate',
        id: 'beSNpdEwiar',
        condition:
            "(values['fbfJO2u7vnf'] > 6 && values['fbfJO2u7vnf'] < 10 && values['y9r6wFWWFgl'] == '' && values['fbfJO2u7vnf'] != '') || (values['y9r6wFWWFgl'] > 500 && values['y9r6wFWWFgl'] < 1000 && values['y9r6wFWWFgl'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'uK4kBnUW2it',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'Ws4xKP2lqIp',
                },
            },
        ],
    },
    {
        name: 'Assign value for Azithromycin_Intermediate',
        id: 'udhT1NIYfkj',
        condition:
            "(values['tDf0wEpy9TM'] > 12 && values['tDf0wEpy9TM'] < 13 && values['jxeoAP1naqM'] == '' && values['tDf0wEpy9TM'] != '') || (values['jxeoAP1naqM'] > 8 && values['jxeoAP1naqM'] < 32 && values['jxeoAP1naqM'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'BbGg7nwnLC1',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'MaJBP9K1y79',
                },
            },
        ],
    },
    {
        name: 'Assign value for Fosfomycin_Susceptible',
        id: 'UCVexaKmQXb',
        condition:
            "(values['tVIynZXmqls'] >= 16 && values['PTbpw8gED1N'] == '' && values['tVIynZXmqls'] != '') || (values['PTbpw8gED1N'] <= 64 && values['PTbpw8gED1N'] != '') ",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'UQZPafuw4Uc',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'mx4AYggTTir',
                },
            },
        ],
    },
    {
        name: 'Assign value for Anidulafungin_Susceptible',
        id: 'vNX6lJtHboO',
        condition:
            "(values['trZzJwgaHR3'] >= 0.25 && values['trZzJwgaHR3'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'XTUScaEWjkr',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'trZzJwgaHR3',
                },
            },
        ],
    },
    {
        name: 'Assign value for Fosfomycin_Susceptible',
        id: 'qAiXj9cueiM',
        condition:
            "(values['tVIynZXmqls'] >= 16 && values['PTbpw8gED1N'] == '' && values['tVIynZXmqls'] != '') || (values['PTbpw8gED1N'] <= 64 && values['PTbpw8gED1N'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'L1wy1dbjaet',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'mx4AYggTTir',
                },
            },
        ],
    },
    {
        name: 'Assign value for Anidulafungin_Resistant',
        id: 'nFykD9mI3wh',
        condition:
            "(values['trZzJwgaHR3'] >= 1 && values['trZzJwgaHR3'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'znTJcEUvJZU',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'R1EXA3KKknF',
                },
            },
        ],
    },
    {
        name: 'Assign value for Fosfomycin_Resistant',
        id: 'votb1hIb7lk',
        condition:
            "(values['tVIynZXmqls'] <= 12 && values['PTbpw8gED1N'] == '' && values['tVIynZXmqls'] != '') || (values['PTbpw8gED1N'] >= 256 && values['PTbpw8gED1N'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'PDT01Jf97q5',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'mx4AYggTTir',
                },
            },
        ],
    },
    {
        name: 'Assign value for Anidulafungin_Intermediate',
        id: 'SfmvuRzPeZN',
        condition:
            "(values['trZzJwgaHR3'] > 0.25 && values['trZzJwgaHR3'] < 1 && values['trZzJwgaHR3'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'kBe6iJ8SNix',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'R1EXA3KKknF',
                },
            },
        ],
    },
    {
        name: 'Assign value for Fosfomycin_Resistant',
        id: 'Er3W0VBYLkr',
        condition:
            "(values['tVIynZXmqls'] <= 12 && values['PTbpw8gED1N'] == '' && values['tVIynZXmqls'] != '') || (values['PTbpw8gED1N'] >= 256 && values['PTbpw8gED1N'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'wPvgBfKHuc4',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'mx4AYggTTir',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ampicillin_Susceptible',
        id: 'j5T8taDZlUB',
        condition:
            "(values['O3Z3ACXAJ5x'] >= 17 && values['qKy76L49kQ5'] == '' && values['O3Z3ACXAJ5x'] != '') || (values['qKy76L49kQ5'] <= 8 && values['qKy76L49kQ5'] != '') ",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'W0tvYHBaala',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'zR8xStM07CW',
                },
            },
        ],
    },
    {
        name: 'Assign value for Fosfomycin_Intermediate',
        id: 'ZtuviVaoryY',
        condition:
            "(values['tVIynZXmqls'] > 12 && values['tVIynZXmqls'] < 16 && values['PTbpw8gED1N'] == '' && values['tVIynZXmqls'] != '') || (values['PTbpw8gED1N'] > 64 && values['PTbpw8gED1N'] < 256 && values['PTbpw8gED1N'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'smQHnCfZIL5',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'mx4AYggTTir',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ampicillin_Susceptible',
        id: 'iMhAoARF9Cr',
        condition:
            "(values['O3Z3ACXAJ5x'] >= 17 && values['qKy76L49kQ5'] == '' && values['O3Z3ACXAJ5x'] != '') || (values['qKy76L49kQ5'] <= 8 && values['qKy76L49kQ5'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'tpQ3uth7lwC',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'zR8xStM07CW',
                },
            },
        ],
    },
    {
        name: 'Assign value for Fosfomycin_Intermediate',
        id: 'Sh1OXQEs0Hx',
        condition:
            "(values['tVIynZXmqls'] > 12 && values['tVIynZXmqls'] < 16 && values['PTbpw8gED1N'] == '' && values['tVIynZXmqls'] != '') || (values['PTbpw8gED1N'] > 64 && values['PTbpw8gED1N'] < 256 && values['PTbpw8gED1N'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'hckEuA68pgd',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'mx4AYggTTir',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ampicillin_Susceptible',
        id: 'upsLuNYIcRY',
        condition:
            "(values['O3Z3ACXAJ5x'] >= 17 && values['qKy76L49kQ5'] == '' && values['O3Z3ACXAJ5x'] != '') || (values['qKy76L49kQ5'] <= 8 && values['qKy76L49kQ5'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'cUNiQ9TDTHJ',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'zR8xStM07CW',
                },
            },
        ],
    },
    {
        name: 'Assign value for Fluconazole_Susceptible',
        id: 'TYK7ExaRhtY',
        condition:
            "(values['GIPEuxYHchx'] <= 17 && values['oGOXPS5VVPW'] == '' && values['GIPEuxYHchx'] != '') || (values['oGOXPS5VVPW'] >= 2 && values['oGOXPS5VVPW'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'Dq7iNjuL1EY',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'lkmtYNGKlRL',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ampicillin_Resistant',
        id: 'vG59R52NVtp',
        condition:
            "(values['O3Z3ACXAJ5x'] <= 16 && values['qKy76L49kQ5'] == '' && values['O3Z3ACXAJ5x'] != '') || (values['qKy76L49kQ5'] >= 16 && values['qKy76L49kQ5'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'tzAf4HHqTM7',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'zR8xStM07CW',
                },
            },
        ],
    },
    {
        name: 'Assign value for Fluconazole_Resistant',
        id: 'Zgjuwln06Rx',
        condition:
            "(values['GIPEuxYHchx'] <= 13 && values['oGOXPS5VVPW'] == '' && values['GIPEuxYHchx'] != '') || (values['oGOXPS5VVPW'] >= 8 && values['oGOXPS5VVPW'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'pPxKNH6hg23',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'lkmtYNGKlRL',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ampicillin_Resistant',
        id: 'GZ6IFUDFVaE',
        condition:
            "(values['O3Z3ACXAJ5x'] <= 13 && values['qKy76L49kQ5'] == '' && values['O3Z3ACXAJ5x'] != '') || (values['qKy76L49kQ5'] >= 32 && values['qKy76L49kQ5'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'NkkImtLZ6UH',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'zR8xStM07CW',
                },
            },
        ],
    },
    {
        name: 'Assign value for Fluconazole_Intermediate',
        id: 'DgkelTeMlxs',
        condition:
            "(values['GIPEuxYHchx'] > 13 && values['GIPEuxYHchx'] < 17 && values['oGOXPS5VVPW'] == '' && values['GIPEuxYHchx'] != '') || (values['oGOXPS5VVPW'] > 2 && values['oGOXPS5VVPW'] < 8 && values['oGOXPS5VVPW'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'tjWr1xjYylJ',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'lkmtYNGKlRL',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ampicillin_Resistant',
        id: 'yVLHIjSR5ck',
        condition:
            "(values['O3Z3ACXAJ5x'] <= 13 && values['qKy76L49kQ5'] == '' && values['O3Z3ACXAJ5x'] != '') || (values['qKy76L49kQ5'] >= 32 && values['qKy76L49kQ5'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'm6a2mrW9pVe',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'zR8xStM07CW',
                },
            },
        ],
    },
    {
        name: 'Assign value for Erythromycin_Susceptible',
        id: 'VILNoSrber4',
        condition:
            "(values['qDSjjhuaYm0'] >= 23 && values['wIazRVCpnlK'] == '' && values['qDSjjhuaYm0'] != '') || (values['wIazRVCpnlK'] <= 0.3 && values['wIazRVCpnlK'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'x93ADLJe1ts',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'fgJmrICgNAX',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ampicillin_Intermediate',
        id: 'jUKdqjiiSr3',
        condition:
            "(values['O3Z3ACXAJ5x'] > 16 && values['O3Z3ACXAJ5x'] < 17 && values['qKy76L49kQ5'] == '' && values['O3Z3ACXAJ5x'] != '') || (values['qKy76L49kQ5'] > 8 && values['qKy76L49kQ5'] < 16 && values['qKy76L49kQ5'] != '')",
        priority: 2,
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'J8bEIhUqnPf',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'zR8xStM07CW',
                },
            },
        ],
    },
    {
        name: 'Assign value for Erythromycin_Resistant',
        id: 'HPPzsmzKHBA',
        condition:
            "(values['qDSjjhuaYm0'] <= 20 && values['wIazRVCpnlK'] == '' && values['qDSjjhuaYm0'] != '') || (values['wIazRVCpnlK'] >= 8 && values['wIazRVCpnlK'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'XoiiVqy9KVB',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'fgJmrICgNAX',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ampicillin_Intermediate',
        id: 'fP63xkB15TO',
        condition:
            "(values['O3Z3ACXAJ5x'] > 13 && values['O3Z3ACXAJ5x'] < 17 && values['qKy76L49kQ5'] == '' && values['O3Z3ACXAJ5x'] != '') || (values['qKy76L49kQ5'] > 8 && values['qKy76L49kQ5'] < 32 && values['qKy76L49kQ5'] != '')",
        priority: 2,
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'B41msSDU0WA',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'zR8xStM07CW',
                },
            },
        ],
    },
    {
        name: 'Assign value for Erythromycin_Intermediate',
        id: 'dnq1Nj1a6hO',
        condition:
            "(values['qDSjjhuaYm0'] > 13 && values['qDSjjhuaYm0'] < 23 && values['wIazRVCpnlK'] == '' && values['qDSjjhuaYm0'] != '') || (values['wIazRVCpnlK'] > 0.5 && values['wIazRVCpnlK'] < 8 && values['wIazRVCpnlK'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'XtYVXFLp8lC',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'fgJmrICgNAX',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ampicillin_Intermediate',
        id: 'ccm7GmHhUOE',
        condition:
            "(values['O3Z3ACXAJ5x'] > 13 && values['O3Z3ACXAJ5x'] < 17 && values['qKy76L49kQ5'] == '' && values['O3Z3ACXAJ5x'] != '') || (values['qKy76L49kQ5'] > 8 && values['qKy76L49kQ5'] < 32 && values['qKy76L49kQ5'] != '')",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'Nc1FVD8EQKS',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'zR8xStM07CW',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ertapenem_Susceptible',
        id: 'qDvTNlAqIFz',
        condition:
            "(values['el3u1NbJxSg'] >= 22 && values['lL2LC94BTw3'] == '' && values['el3u1NbJxSg'] != '') || (values['lL2LC94BTw3'] <= 0.5 && values['lL2LC94BTw3'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'HxUn1AuJekI',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'obDZttfd7Cm',
                },
            },
        ],
    },
    {
        name: 'Assign value for Amphotericin B_Susceptible',
        id: 'DDaJ44pWOqJ',
        condition:
            "(values['dq8ORL3DxkI'] <= 15 && values['bE5meXeHH3H'] == '' && values['dq8ORL3DxkI'] != '') || (values['bE5meXeHH3H'] >= 2 && values['bE5meXeHH3H'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'Ikq1ALNbv5u',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'GB0gugeqeG9',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ertapenem_Resistant',
        id: 'tCwWgHuYPQ7',
        condition:
            "(values['el3u1NbJxSg'] <= 18 && values['lL2LC94BTw3'] == '' && values['el3u1NbJxSg'] != '') || (values['lL2LC94BTw3'] >= 2 && values['lL2LC94BTw3'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'g080msJmAgo',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'obDZttfd7Cm',
                },
            },
        ],
    },
    {
        name: 'Assign value for Amphotericin B_Resistant',
        id: 'XJxXFlYvjyf',
        condition:
            "(values['dq8ORL3DxkI'] <= 14 && values['bE5meXeHH3H'] == '' && values['dq8ORL3DxkI'] != '') || (values['bE5meXeHH3H'] >= 4 && values['bE5meXeHH3H'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'xR0txWkjnbJ',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'GB0gugeqeG9',
                },
            },
        ],
    },
    {
        name: 'Assign value for Ertapenem_Intermediate',
        id: 'B5PtU3XRP8Q',
        condition:
            "(values['el3u1NbJxSg'] > 18 && values['el3u1NbJxSg'] < 22 && values['lL2LC94BTw3'] == '' && values['el3u1NbJxSg'] != '') || (values['lL2LC94BTw3'] > 0.5 && values['lL2LC94BTw3'] < 2 && values['lL2LC94BTw3'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'xZJB7sv1i1Q',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'obDZttfd7Cm',
                },
            },
        ],
    },
    {
        name: 'Assign value for Amphotericin B_Intermediate',
        id: 'rOINdCOusQ4',
        condition:
            "(values['dq8ORL3DxkI'] > 14 && values['dq8ORL3DxkI'] < 15 && values['bE5meXeHH3H'] == '' && values['dq8ORL3DxkI'] != '') || (values['bE5meXeHH3H'] > 2 && values['bE5meXeHH3H'] < 4 && values['bE5meXeHH3H'] != '')",
        priority: 2,
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'oTpT3yHItwV',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'GB0gugeqeG9',
                },
            },
        ],
    },
    {
        name: 'Assign value for Colistin_Susceptible',
        id: 'hQx2F0emJxY',
        condition:
            "(values['DFZBK5SZEWv'] <= 2 && values['DFZBK5SZEWv'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'DIp23KcHfbv',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'CrkSOhRJQbn',
                },
            },
        ],
    },
    {
        name: 'Assign value for Amikacin_Susceptible',
        id: 'sEweZ1r6mSj',
        condition:
            "(values['VGdJnkTlNyK'] >= 17 && values['GYNpOJWcNx2'] == '' && values['VGdJnkTlNyK'] != '') || (values['GYNpOJWcNx2'] <= 16 && values['GYNpOJWcNx2'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'yu04EFP0Xda',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'KmgWX65h0iM',
                },
            },
        ],
    },
    {
        name: 'Assign value for Colistin_Susceptible',
        id: 'pw68auVViZA',
        condition:
            "(values['DFZBK5SZEWv'] <= 2 && values['DFZBK5SZEWv'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'QH8mY7mYda0',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'CrkSOhRJQbn',
                },
            },
        ],
    },
    {
        name: 'Assign value for Amikacin_Susceptible',
        id: 'YvGDmwmG0j6',
        condition:
            "(values['VGdJnkTlNyK'] >= 17 && values['GYNpOJWcNx2'] == '' && values['VGdJnkTlNyK'] != '') || (values['GYNpOJWcNx2'] <= 16 && values['GYNpOJWcNx2'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'WgcycH6Y86Z',
                programRuleActionType: 'ASSIGN',
                data: 'Susceptible',
                dataElement: {
                    id: 'KmgWX65h0iM',
                },
            },
        ],
    },
    {
        name: 'Assign value for Colistin_Resistant',
        id: 'QC1NTSu1eHJ',
        condition:
            "(values['DFZBK5SZEWv'] >= 4 && values['DFZBK5SZEWv'] != '')",
        priority: 2,
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'FWn4Md2BBY5',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'CrkSOhRJQbn',
                },
            },
        ],
    },
    {
        name: 'Assign value for Amikacin_Resistant',
        id: 'vKoGFSV1AWt',
        condition:
            "(values['VGdJnkTlNyK'] <= 14 && values['GYNpOJWcNx2'] == '' && values['VGdJnkTlNyK'] != '') || (values['GYNpOJWcNx2'] >= 64 && values['GYNpOJWcNx2'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'tOieCfdHW8X',
                programRuleActionType: 'ASSIGN',
                data: 'Resistant',
                dataElement: {
                    id: 'KmgWX65h0iM',
                },
            },
        ],
    },
    {
        name: 'Assign value for Tetracycline_Intermediate',
        id: 'm01iMUddAce',
        condition:
            "(values['LfdV52yh0VB'] > 11 && values['LfdV52yh0VB'] < 15 && values['ZRc36SwmAFa'] == '' && values['LfdV52yh0VB'] != '') || (values['ZRc36SwmAFa'] > 4 && values['ZRc36SwmAFa'] < 16 && values['ZRc36SwmAFa'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'tzaMvKtKPas',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'if0UEH2z3ko',
                },
            },
        ],
    },
    {
        name: 'Assign value for Amikacin_Intermediate',
        id: 'toDu5pOjFBz',
        condition:
            "(values['VGdJnkTlNyK'] > 14 && values['VGdJnkTlNyK'] < 17 && values['GYNpOJWcNx2'] == '' && values['VGdJnkTlNyK'] != '') || (values['GYNpOJWcNx2'] > 16 && values['GYNpOJWcNx2'] < 64 && values['GYNpOJWcNx2'] != '')",
        priority: 2,
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'OQMdPO40yWX',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'KmgWX65h0iM',
                },
            },
        ],
    },
    {
        name: 'Assign value for Oritavancin_Intermediate',
        id: 'Qwvoy6meC4d',
        condition:
            "(values['v4znitWGFyi'] > 0.12 && values['v4znitWGFyi'] < 0.25 && values['v4znitWGFyi'] != '')",
        priority: 2,
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'Ian1HrH19KL',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'xzsjJxKV4KR',
                },
            },
        ],
    },
    {
        name: 'Assign value for Trimethoprim - Sulfamethoxazole_Intermediate',
        id: 'mp7sCIjfxAM',
        condition:
            "(values['IvruNSGNqg7'] > 10 && values['IvruNSGNqg7'] < 16 && values['dSu1B7lkeEM'] == '' && values['IvruNSGNqg7'] != '') || (values['dSu1B7lkeEM'] > 40 && values['dSu1B7lkeEM'] < 80 && values['dSu1B7lkeEM'] != '') || (values['Hp3PSM2svaM'] > 10 && values['Hp3PSM2svaM'] < 16 && values['dSu1B7lkeEM'] == '' && values['Hp3PSM2svaM'] != '') ",
        priority: 2,
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'ylcg8p5dDx8',
                programRuleActionType: 'ASSIGN',
                data: 'Intermediate',
                dataElement: {
                    id: 'wcoEmlL4YNV',
                },
            },
        ],
    },
    {
        name: 'Hide rejected level 1 reason',
        id: 'yj7GWjGZdpM',
        condition: "values['tAyVrNUTVHX'] !='Rejected'",
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'ae4EeN49Rla',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'NLmLwjdSHMv',
                },
            },
        ],
    },
    {
        name: 'Show urine samples',
        id: 'rXS4LtvwXKT',
        condition: 'true',
        programStage: {
            id: 'UW26ioWbKzv',
        },
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'dZmrZFdcAr3',
                programRuleActionType: 'SHOWOPTIONGROUP',
                optionGroup: {
                    id: 'ZAZ0x81n1G6',
                },
                dataElement: {
                    id: 'mp5MeJ2dFQz',
                },
            },
        ],
    },
    {
        name: 'Hide rejected level 1 reason',
        id: 'IPy18sgQzGR',
        condition: "values['tAyVrNUTVHX'] !='Rejected'",
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'dAketkt2Tde',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'NLmLwjdSHMv',
                },
            },
        ],
    },
    {
        name: 'Hide devices others',
        id: 'Gir1YmYKB7Z',
        condition: "values['h9RODgVF4O1'] != 'true'",
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'fm0RtbrU398',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'h9RODgVF4O1',
                },
            },
        ],
    },
    {
        name: 'Hide rejected level 2 reason',
        id: 'aOvVBLTxr28',
        condition: "values['sXDQT6Yaf77'] !='Rejected'",
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'uAGAbD7sUzY',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'pz8SoHBO6RL',
                },
            },
        ],
    },
    {
        name: 'Hide Imipenem',
        id: 'vgl9b82lWWt',
        condition:
            " values['SaQe2REkGVw']=='PMA' || values['SaQe2REkGVw']=='PCE' || values['SaQe2REkGVw']=='SPN' ",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'dp6SKeBFPVo',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'fOmuusloF7k',
                },
            },
            {
                id: 'Bqryj7FNbic',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'f0vYwlbsdQA',
                },
            },
        ],
    },
    {
        name: 'Hide rejected level 2 reason',
        id: 'nqoZo6mf5M1',
        condition: "values['sXDQT6Yaf77'] !='Rejected'",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'jFSB9hg15Gm',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'pz8SoHBO6RL',
                },
            },
        ],
    },
    {
        name: 'Hide devices others',
        id: 'h6gIzVbSIFx',
        condition: "values['h9RODgVF4O1'] != 'true'",
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'rN2caVhYVxk',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'h9RODgVF4O1',
                },
            },
        ],
    },
    {
        name: 'Hide rejected level 2 reason',
        id: 'Ye50Ca1yS5f',
        condition: "values['sXDQT6Yaf77'] !='Rejected'",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'v4v7MTUwj7f',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'pz8SoHBO6RL',
                },
            },
        ],
    },
    {
        name: 'Hide Isolate transfer',
        id: 'PLVE3uPCwYl',
        condition: 'true',
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'Km53Q2BdvE1',
                programRuleActionType: 'HIDESECTION',
                programStageSection: {
                    id: 'Id0AOZGLJiG',
                },
            },
        ],
    },
    {
        name: 'Hide rejected level 2 reason',
        id: 'aUJPoXyXv9K',
        condition: "values['sXDQT6Yaf77'] !='Rejected'",
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'UBddY1o6og9',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'pz8SoHBO6RL',
                },
            },
        ],
    },
    {
        name: 'Hide Isolate transfer',
        id: 'z5w6j8lTCJx',
        condition: 'true',
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'BR11wFJy6My',
                programRuleActionType: 'HIDESECTION',
                programStageSection: {
                    id: 'Id0AOZGLJiG',
                },
            },
        ],
    },
    {
        name: 'Hide rejected level 2 reason',
        id: 'qgmX1uPWZ8d',
        condition: "values['sXDQT6Yaf77'] !='Rejected'",
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'ebzyVtGbAB8',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'pz8SoHBO6RL',
                },
            },
        ],
    },
    {
        name: 'Hide isolate transfer',
        id: 'rtvhiIHWVMX',
        condition: 'true',
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'v6OXpdVY8Us',
                programRuleActionType: 'HIDESECTION',
                programStageSection: {
                    id: 'u11dYHOAhwd',
                },
            },
        ],
    },
    {
        name: 'Hide rejected level 2 reason',
        id: 'gcAEJ1jwppc',
        condition: "values['sXDQT6Yaf77'] !='Rejected'",
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'YIp3hLTxl9Z',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'pz8SoHBO6RL',
                },
            },
        ],
    },
    {
        name: 'Hide Itraconazole',
        id: 'kOxU1zdS1uV',
        condition:
            "values['SaQe2REkGVw'] == 'BLA' || values['SaQe2REkGVw'] == 'CAL' || values['SaQe2REkGVw'] == 'CAA' || values['SaQe2REkGVw'] == 'CCT' || values['SaQe2REkGVw'] == 'CCP' || values['SaQe2REkGVw'] == 'TCA' || values['SaQe2REkGVw'] == 'THA' || values['SaQe2REkGVw'] == 'CIN' || values['SaQe2REkGVw'] == 'CPS' || values['SaQe2REkGVw'] == 'CLP' || values['SaQe2REkGVw'] == 'CLU' || values['SaQe2REkGVw'] == 'CAN' || values['SaQe2REkGVw'] == 'CPR' || values['SaQe2REkGVw'] == 'CNP' || values['SaQe2REkGVw'] == 'CRU' || values['SaQe2REkGVw'] == 'CTR' || values['SaQe2REkGVw'] == 'CUT' || values['SaQe2REkGVw'] == 'CAV' || values['SaQe2REkGVw'] == 'CNE' || values['SaQe2REkGVw'] == 'CGT' || values['SaQe2REkGVw'] == 'CNG' || values['SaQe2REkGVw'] == 'DBH' || values['SaQe2REkGVw'] == 'KOH' || values['SaQe2REkGVw'] == 'PIF' || values['SaQe2REkGVw'] == 'PIJ' || values['SaQe2REkGVw'] == 'PIK' || values['SaQe2REkGVw'] == 'PSA' || values['SaQe2REkGVw'] == 'PSC' || values['SaQe2REkGVw'] == 'RGL' || values['SaQe2REkGVw'] == 'RRU' || values['SaQe2REkGVw'] == 'SCE' || values['SaQe2REkGVw'] == 'TAS' || values['SaQe2REkGVw'] == 'TMU' || values['SaQe2REkGVw'] == 'WAN' || values['SaQe2REkGVw'] == 'CGL' || values['SaQe2REkGVw'] == 'CPA' || values['SaQe2REkGVw'] == 'CKR' || values['SaQe2REkGVw'] == 'CGU'",
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'gJOACijqhjP',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'G5g9qxaItEc',
                },
            },
            {
                id: 'pfIxl7J3AEw',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'wbKF56To77p',
                },
            },
        ],
    },
    {
        name: 'Hide rejected level 2 reason',
        id: 'bRYCrqwIJUO',
        condition: "values['sXDQT6Yaf77'] !='Rejected'",
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'kwV0XgiYKZf',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'pz8SoHBO6RL',
                },
            },
        ],
    },
    {
        name: 'Hide level 2 section',
        id: 'oHy2ELfYIyW',
        condition: "values['tAyVrNUTVHX'] !='Approved'",
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'dGIdjAVRh9Q',
                programRuleActionType: 'HIDESECTION',
                programStageSection: {
                    id: 'Q2ZP7Rn5vx0',
                },
            },
        ],
    },
    {
        name: 'Hide resend level 1 reason',
        id: 'POJFOKG5gDz',
        condition: "values['tAyVrNUTVHX'] !='Resend'",
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'ryJaMw6ldIa',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'wCNQtIHJRON',
                },
            },
        ],
    },
    {
        name: 'Hide level 2 section',
        id: 'qTEM4HesuaG',
        condition: "values['tAyVrNUTVHX'] !='Approved'",
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'QmMOROF3E3S',
                programRuleActionType: 'HIDESECTION',
                programStageSection: {
                    id: 'Q2ZP7Rn5vx0',
                },
            },
        ],
    },
    {
        name: 'Hide resend level 1 reason',
        id: 'KTfqCVla6cV',
        condition: "values['tAyVrNUTVHX'] !='Resend'",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'uAafdWCeVoK',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'wCNQtIHJRON',
                },
            },
        ],
    },
    {
        name: 'Hide level 2 section',
        id: 'tcKSQX2hjk5',
        condition: "values['tAyVrNUTVHX'] !='Approved'",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'Qh9881Z9cvI',
                programRuleActionType: 'HIDESECTION',
                programStageSection: {
                    id: 'pIQCzqFVfce',
                },
            },
        ],
    },
    {
        name: 'Hide resend level 1 reason',
        id: 'Qwk52ornCjf',
        condition: "values['tAyVrNUTVHX'] !='Resend'",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'rYSsomgngwD',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'wCNQtIHJRON',
                },
            },
        ],
    },
    {
        name: 'Hide level 2 section',
        id: 'KkEFgZUutJK',
        condition: "values['tAyVrNUTVHX'] !='Approved'",
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'qvGI0PS3xHk',
                programRuleActionType: 'HIDESECTION',
                programStageSection: {
                    id: 'Q2ZP7Rn5vx0',
                },
            },
        ],
    },
    {
        name: 'Hide resend level 1 reason',
        id: 's95IqZw4n9r',
        condition: "values['tAyVrNUTVHX'] !='Resend'",
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'QCO93LwgRgS',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'wCNQtIHJRON',
                },
            },
        ],
    },
    {
        name: 'Hide comorbidity others',
        id: 'ChpcXJlUPjx',
        condition: "values['V0C17jO5GqO'] != 'true'",
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'EqgkcRkqCEe',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'CqyqhAIuUSP',
                },
            },
        ],
    },
    {
        name: 'Hide resend level 1 reason',
        id: 'lQlSJJrTESj',
        condition: "values['tAyVrNUTVHX'] !='Resend'",
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'ptqjDdjsfxx',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'wCNQtIHJRON',
                },
            },
        ],
    },
    {
        name: 'Hide comorbidity others',
        id: 'dSNqoCvEWyD',
        condition: "values['V0C17jO5GqO'] != 'true'",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'fxgoqfnqemj',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'CqyqhAIuUSP',
                },
            },
        ],
    },
    {
        name: 'Hide resend level 1 reason',
        id: 'eYHBtrrTxfQ',
        condition: "values['tAyVrNUTVHX'] !='Resend' ",
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'tEoOL1dJr5K',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'wCNQtIHJRON',
                },
            },
        ],
    },
    {
        name: 'Hide comorbidity others',
        id: 'NjPjXB02eA1',
        condition: "values['V0C17jO5GqO'] != 'true'",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'tQL1GgCskvj',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'CqyqhAIuUSP',
                },
            },
        ],
    },
    {
        name: 'Hide resend level 1 reason',
        id: 'wIklfv76a0x',
        condition: "values['tAyVrNUTVHX'] !='Resend'",
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'q9oVvvsWQpI',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'wCNQtIHJRON',
                },
            },
        ],
    },
    {
        name: 'Hide Colistin',
        id: 'QpTzZXPLe6m',
        condition:
            "values['SaQe2REkGVw'] == 'PMA' || values['SaQe2REkGVw']=='PCE' || values['SaQe2REkGVw']=='SPN' ",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'xquczPAqhMx',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'DFZBK5SZEWv',
                },
            },
        ],
    },
    {
        name: 'Hide resend level 2 reason',
        id: 'LCfKKiZCQMV',
        condition: "values['sXDQT6Yaf77'] !='Resend'",
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'BUB0yOn62aN',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'fEnFVvEFKVc',
                },
            },
        ],
    },
    {
        name: 'Hide Ciprofloxacin',
        id: 'EoQ2JAGOEQk',
        condition:
            "values['SaQe2REkGVw'] == 'ABA' || values['SaQe2REkGVw'] == 'ACA' || values['SaQe2REkGVw']=='ALW' || values['SaQe2REkGVw']=='AC-' || values['SaQe2REkGVw']=='PMA' || values['SaQe2REkGVw']=='PCE' || values['SaQe2REkGVw']=='BCE' || values['SaQe2REkGVw']=='SPN' ",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'hqFPLJi0DZM',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'f666SCFrjuM',
                },
            },
            {
                id: 'EWdAhn0797L',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'nikrSOx63ce',
                },
            },
        ],
    },
    {
        name: 'Hide resend level 2 reason',
        id: 'FvvhrQqQvRn',
        condition: "values['sXDQT6Yaf77'] !='Resend'",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'FET1CYIk6IG',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'fEnFVvEFKVc',
                },
            },
        ],
    },
    {
        name: 'Hide Mupirocin High Level',
        id: 'GUh0LXIEimC',
        condition:
            "values['SaQe2REkGVw'] == 'SPE' || values['SaQe2REkGVw'] == 'SEP' || values['SaQe2REkGVw'] == 'SHL' || values['SaQe2REkGVw'] == 'SHO' || values['SaQe2REkGVw'] == 'SAP' || values['SaQe2REkGVw'] == 'STA' || values['SaQe2REkGVw'] == 'SLU' ",
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'qiiHvUEnqfn',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'AGX90gKwEP8',
                },
            },
            {
                id: 'mNho9J6vKrL',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 't4gMYpWynRp',
                },
            },
        ],
    },
    {
        name: 'Hide resend level 2 reason',
        id: 'Bnqykz3Tm4e',
        condition: "values['sXDQT6Yaf77'] !='Resend'",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'W3Vptm9dgpQ',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'fEnFVvEFKVc',
                },
            },
        ],
    },
    {
        name: 'Hide Nalidixic acid',
        id: 'fIC1lHwPnBb',
        condition:
            "values['SaQe2REkGVw'] == 'ARI' || values['SaQe2REkGVw'] == 'SEN' || values['SaQe2REkGVw'] == 'SHG' || values['SaQe2REkGVw'] == 'SNE' || values['SaQe2REkGVw'] == 'SAF' || values['SaQe2REkGVw'] == 'STM'",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'j0UtvBuNngY',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'yC1igYd2Cnl',
                },
            },
            {
                id: 'akVr5bncA9F',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'DMb8qoZPnnZ',
                },
            },
        ],
    },
    {
        name: 'Hide resend level 2 reason',
        id: 'hdIiro8s7Ur',
        condition: "values['sXDQT6Yaf77'] !='Resend'",
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'oO8MimXloQG',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'fEnFVvEFKVc',
                },
            },
        ],
    },
    {
        name: 'Hide Cefoxitin',
        id: 'wWaF8Vwi3sh',
        condition:
            "values['SaQe2REkGVw'] == 'SPE' || values['SaQe2REkGVw'] == 'SEP' || values['SaQe2REkGVw'] == 'SHL' || values['SaQe2REkGVw'] == 'SHO' || values['SaQe2REkGVw'] == 'SAP' || values['SaQe2REkGVw'] == 'STA'",
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'qnfopO9m9DY',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'luj4jZNXRjB',
                },
            },
            {
                id: 'YWcU9LjHhFI',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'FVjeBMIIEqn',
                },
            },
        ],
    },
    {
        name: 'Hide resend level 2 reason',
        id: 'WGkk9v02Cmt',
        condition: "values['sXDQT6Yaf77'] !='Resend'",
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'EJl5RBj1Mu9',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'fEnFVvEFKVc',
                },
            },
        ],
    },
    {
        name: 'Hide Norfloxacin',
        id: 'dpQ0nrZrn7V',
        condition:
            "values['SaQe2REkGVw'] == 'ARI' || values['SaQe2REkGVw'] == 'SEN' || values['SaQe2REkGVw'] == 'SHG' || values['SaQe2REkGVw'] == 'SNE' || values['SaQe2REkGVw'] == 'SAF' || values['SaQe2REkGVw'] == 'STM'",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'JY3hwARQwrs',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'y0YzPyfZNwb',
                },
            },
            {
                id: 'sQmv1jnWEPu',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'NBHJLVnacXh',
                },
            },
        ],
    },
    {
        name: 'Hide resend level 2 reason',
        id: 'LUgKdVz1gBd',
        condition: "values['sXDQT6Yaf77'] !='Resend'",
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'AoWx4lZBpkx',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'fEnFVvEFKVc',
                },
            },
        ],
    },
    {
        name: 'Hide Caspofungin',
        id: 'P1S0HIPCCFJ',
        condition:
            "values['SaQe2REkGVw'] == 'CGL' || values['SaQe2REkGVw'] == 'AND' || values['SaQe2REkGVw'] == 'CGU' ",
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'kpurh2pFeeW',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'sgzWFcSXWxS',
                },
            },
            {
                id: 'cwx1LwpYPwC',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'LC3X7WR4XRQ',
                },
            },
        ],
    },
    {
        name: 'Hide resend level 2 reason',
        id: 'gFWskWJQe6x',
        condition: "values['sXDQT6Yaf77'] !='Resend'",
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'ehDFDK9JhSV',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'fEnFVvEFKVc',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 5',
        id: 'p2kp7ZzBAWT',
        condition: "values['kH30plwbeAP'] ==''",
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'TCC7j85Io0N',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'kAOxkp1lQdB',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 4',
        id: 'jztABQomSHw',
        condition: "values['khMMIiU2Zwa'] ==''",
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'xIoV9TkH0XG',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'kH30plwbeAP',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 5',
        id: 'YvFwDau44y3',
        condition: "values['kH30plwbeAP'] ==''",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'D82gluFo3sz',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'kAOxkp1lQdB',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 4',
        id: 'sq7XTWGZr53',
        condition: "values['khMMIiU2Zwa'] == ''",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'ycHvQeIYYa2',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'kH30plwbeAP',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 5',
        id: 'N1sfJ4olWnP',
        condition: "values['kH30plwbeAP'] == ''",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'sS4zr9mOQHY',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'kAOxkp1lQdB',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 3',
        id: 'z6fi20JHSUw',
        condition: "values['hVjlOYaCYMS'] ==''",
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'GNUwHxSTtlH',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'khMMIiU2Zwa',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 4',
        id: 'sKhSr4e3dsI',
        condition: "values['khMMIiU2Zwa'] ==''",
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'xgQ2B4DpLtd',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'kH30plwbeAP',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 3',
        id: 'Ck9hmnUWt3a',
        condition: "values['hVjlOYaCYMS'] ==''",
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'U2G0dGYYd2s',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'khMMIiU2Zwa',
                },
            },
        ],
    },
    {
        name: 'Hide Posaconazole',
        id: 'xOBN9CpAM3K',
        condition:
            "values['SaQe2REkGVw'] == 'BLA' || values['SaQe2REkGVw'] == 'CAL' || values['SaQe2REkGVw'] == 'CAA' || values['SaQe2REkGVw'] == 'CCT' || values['SaQe2REkGVw'] == 'CCP' || values['SaQe2REkGVw'] == 'TCA' || values['SaQe2REkGVw'] == 'THA' || values['SaQe2REkGVw'] == 'CIN' || values['SaQe2REkGVw'] == 'CPS' || values['SaQe2REkGVw'] == 'CLP' || values['SaQe2REkGVw'] == 'CLU' || values['SaQe2REkGVw'] == 'CAN' || values['SaQe2REkGVw'] == 'CPR' || values['SaQe2REkGVw'] == 'CNP' || values['SaQe2REkGVw'] == 'CRU' || values['SaQe2REkGVw'] == 'CTR' || values['SaQe2REkGVw'] == 'CUT' || values['SaQe2REkGVw'] == 'CAV' || values['SaQe2REkGVw'] == 'CNE' || values['SaQe2REkGVw'] == 'CGT' || values['SaQe2REkGVw'] == 'CNG' || values['SaQe2REkGVw'] == 'DBH' || values['SaQe2REkGVw'] == 'KOH' || values['SaQe2REkGVw'] == 'PIF' || values['SaQe2REkGVw'] == 'PIJ' || values['SaQe2REkGVw'] == 'PIK' || values['SaQe2REkGVw'] == 'PSA' || values['SaQe2REkGVw'] == 'PSC' || values['SaQe2REkGVw'] == 'RGL' || values['SaQe2REkGVw'] == 'RRU' || values['SaQe2REkGVw'] == 'SCE' || values['SaQe2REkGVw'] == 'TAS' || values['SaQe2REkGVw'] == 'TMU' || values['SaQe2REkGVw'] == 'WAN' || values['SaQe2REkGVw'] == 'CGL' || values['SaQe2REkGVw'] == 'CPA' || values['SaQe2REkGVw'] == 'CKR' || values['SaQe2REkGVw'] == 'CGU'",
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'tSXvvCkAONN',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'rYMrMTYi1EK',
                },
            },
            {
                id: 'lvBhhqK3R3J',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'x0cDjIk7FLV',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 3',
        id: 'MAm70QEUuUs',
        condition: "values['hVjlOYaCYMS'] ==''",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'e0b1Vnh0hVa',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'khMMIiU2Zwa',
                },
            },
        ],
    },
    {
        name: 'Hide rejected level 1 reason',
        id: 'UYcNpeeuNA5',
        condition: "values['tAyVrNUTVHX'] !='Rejected'",
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'd0Xgi6wcTZ7',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'NLmLwjdSHMv',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 3',
        id: 'o8NwOYJdRdP',
        condition: "values['hVjlOYaCYMS'] ==''",
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'wgM5Z1dwjlx',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'khMMIiU2Zwa',
                },
            },
        ],
    },
    {
        name: 'Hide rejected level 1 reason',
        id: 'dQhS0UfQT8s',
        condition: "values['tAyVrNUTVHX'] !='Rejected'",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'xDPgydj9rSA',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'NLmLwjdSHMv',
                },
            },
        ],
    },
    {
        name: 'Hide Tetracyclin',
        id: 'KhWj49i2vvh',
        condition:
            "values['SaQe2REkGVw'] == 'ECOD' || values['SaQe2REkGVw'] == 'SHC' || values['SaQe2REkGVw'] == 'SHA' || values['SaQe2REkGVw'] == 'SHB' || values['SaQe2REkGVw'] == 'SHD' || values['SaQe2REkGVw'] == 'SHI' || values['SaQe2REkGVw'] == 'ARI' || values['SaQe2REkGVw'] == 'SEN' || values['SaQe2REkGVw'] == 'SHG' || values['SaQe2REkGVw'] == 'SNE' || values['SaQe2REkGVw'] == 'SAF' || values['SaQe2REkGVw'] == 'STM'",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'wSonwICDxdj',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'ZRc36SwmAFa',
                },
            },
            {
                id: 'fB9RYvIekFJ',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'LfdV52yh0VB',
                },
            },
        ],
    },
    {
        name: 'Hide rejected level 1 reason',
        id: 'Hk8eMLeUtNr',
        condition: "values['tAyVrNUTVHX'] !='Rejected'",
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'hrpqsbMX0tm',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'NLmLwjdSHMv',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 3',
        id: 'uSS7qDyCPHc',
        condition: "values['hVjlOYaCYMS'] == ''",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'b4Y6WptTOTY',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'khMMIiU2Zwa',
                },
            },
        ],
    },
    {
        name: 'Hide devices others',
        id: 'UCJP62pohJw',
        condition: "values['h9RODgVF4O1'] != 'true'",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'WpjX9feeiF5',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'h9RODgVF4O1',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 2',
        id: 'OMzVf9mJIIt',
        condition: "values['RRc3et0yhsn'] ==''",
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'JmAebWZO30D',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'hVjlOYaCYMS',
                },
            },
        ],
    },
    {
        name: 'Hide Isolate transfer',
        id: 'ZozjYmNZuwI',
        condition: 'true',
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'xGYsotAffR7',
                programRuleActionType: 'HIDESECTION',
                programStageSection: {
                    id: 'Id0AOZGLJiG',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 2',
        id: 'Le0EveM2En9',
        condition: "values['RRc3et0yhsn'] ==''",
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'JfD2U1pAAhO',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'hVjlOYaCYMS',
                },
            },
        ],
    },
    {
        name: 'Hide Isolate transfer',
        id: 'Ixdcjh8aB1f',
        condition: 'true',
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'TzHsA1d6nW8',
                programRuleActionType: 'HIDESECTION',
                programStageSection: {
                    id: 'Id0AOZGLJiG',
                },
            },
        ],
    },
    {
        name: 'Hide Ticarcillin calvunic acid',
        id: 'N31afPiFR4E',
        condition:
            "values['SaQe2REkGVw'] == 'PAE' || values['SaQe2REkGVw']=='ABA' || values['SaQe2REkGVw']=='ACA' || values['SaQe2REkGVw']=='ALW' || values['SaQe2REkGVw']=='AC-' || values['SaQe2REkGVw']=='BCE'",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'lIg2bzvgbYw',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'LRy2NHqYMwX',
                },
            },
        ],
    },
    {
        name: 'Hide level 2 section',
        id: 'UUcxtF2p3Rn',
        condition: "values['tAyVrNUTVHX'] !='Approved'",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'WEaMZhxHUcd',
                programRuleActionType: 'HIDESECTION',
                programStageSection: {
                    id: 'Q2ZP7Rn5vx0',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 2',
        id: 'xCx0RRUJJUF',
        condition: "values['RRc3et0yhsn'] ==''",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'nP25M29EsXb',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'hVjlOYaCYMS',
                },
            },
        ],
    },
    {
        name: 'Hide level 2 section',
        id: 'jHJ0pjldiNO',
        condition: "values['tAyVrNUTVHX'] !='Approved'",
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'ny8STQyzgI0',
                programRuleActionType: 'HIDESECTION',
                programStageSection: {
                    id: 'SNIXzaeIy9A',
                },
            },
        ],
    },
    {
        name: 'Hide Tobramycine',
        id: 'Vptb2L037Tu',
        condition:
            "values['SaQe2REkGVw'] == 'ABA' || values['SaQe2REkGVw'] == 'ACA' || values['SaQe2REkGVw']=='ALW' || values['SaQe2REkGVw']=='AC-' || values['SaQe2REkGVw']=='PMA' || values['SaQe2REkGVw']=='PCE' || values['SaQe2REkGVw']=='BCE' || values['SaQe2REkGVw']=='SPN' ",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'USm2H1WcL4b',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'xllrLKdvFjA',
                },
            },
            {
                id: 'zOseEwrFEuW',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'C2ThEwTZ6rm',
                },
            },
        ],
    },
    {
        name: 'Hide comorbidity others',
        id: 'siZElpYh4SC',
        condition: "values['V0C17jO5GqO'] != 'true'",
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'Qjrv9zw4Jfx',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'CqyqhAIuUSP',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 2',
        id: 'MlCYKJpm6pb',
        condition: "values['RRc3et0yhsn'] ==''",
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'N1lOlkJX8ah',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'hVjlOYaCYMS',
                },
            },
        ],
    },
    {
        name: 'Hide Meropenem',
        id: 'hVv3CbvsZ4k',
        condition: " values['SaQe2REkGVw']=='PMA'",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'ureAro27tc2',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'S5dYjuVXvgZ',
                },
            },
            {
                id: 'JnoRtEBG4Cr',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'vX1XAmSKfxx',
                },
            },
        ],
    },
    {
        name: 'Hide Trimethoprim sulfamethoxazole',
        id: 'kbsKschs4rl',
        condition:
            "values['SaQe2REkGVw'] == 'ABA' || values['SaQe2REkGVw'] == 'ACA' || values['SaQe2REkGVw']=='ALW' || values['SaQe2REkGVw']=='AC-' || values['SaQe2REkGVw']=='BCE' || values['SaQe2REkGVw']=='PAE'||",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'ektB2C9HCKB',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'IvruNSGNqg7',
                },
            },
            {
                id: 'HLR9klzPonl',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'Hp3PSM2svaM',
                },
            },
            {
                id: 'QRJaUMTnr3L',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'dSu1B7lkeEM',
                },
            },
        ],
    },
    {
        name: 'Hide Chloramphenicol',
        id: 'zguPPlzJrng',
        condition:
            "values['SaQe2REkGVw'] == 'ECOD' || values['SaQe2REkGVw'] == 'SHC' || values['SaQe2REkGVw'] == 'SHA' || values['SaQe2REkGVw'] == 'SHB' || values['SaQe2REkGVw'] == 'SHD' || values['SaQe2REkGVw'] == 'SHI' || values['SaQe2REkGVw'] == 'VIC' || values['SaQe2REkGVw'] == 'VIP' || values['SaQe2REkGVw'] == 'VI-'",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'gqz9LA7lFXS',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'gnjCD7h8Dm8',
                },
            },
            {
                id: 'hEVoONF8GFV',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'jL3eD3wbnot',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 2',
        id: 'gzVI3F7ctsH',
        condition: "values['RRc3et0yhsn'] == ''",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'p82PDtaxYK0',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'hVjlOYaCYMS',
                },
            },
        ],
    },
    {
        name: 'Hide Ceftazidime',
        id: 'A3OJ5CmTiU5',
        condition:
            "values['SaQe2REkGVw'] == 'PAE' || values['SaQe2REkGVw']=='ABA' || values['SaQe2REkGVw']=='ACA' || values['SaQe2REkGVw']=='ALW' || values['SaQe2REkGVw']=='AC-' || values['SaQe2REkGVw']=='BCE'",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'A9rfs8GgMWM',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'di11o1M6VkO',
                },
            },
            {
                id: 'xsjgr4wNHuH',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'eW0PzKIfMSn',
                },
            },
            {
                id: 'Mf1CmLETyA6',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'AW75JSOPNZh',
                },
            },
        ],
    },
    {
        name: 'Hide AMR Id',
        id: 'Anwn0lSIAk3',
        condition: "values['lIkk661BLpG'] ==''",
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'S622x1JHFL9',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'lIkk661BLpG',
                },
            },
        ],
    },
    {
        name: 'Hide Cefepime',
        id: 'Muljh225MPk',
        condition:
            "values['SaQe2REkGVw'] == 'PMA' || values['SaQe2REkGVw'] == 'PCE' || values['SaQe2REkGVw']=='SPN'",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'mUzBUujPOIB',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'aTWISEtdC9C',
                },
            },
            {
                id: 'RHnmF9YZR1y',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'ComY5zACdjQ',
                },
            },
        ],
    },
    {
        name: 'Hide AMR Id',
        id: 'mB8ojyj1fdv',
        condition: "values['lIkk661BLpG'] == ''",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'SFpvxG2Y5py',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'lIkk661BLpG',
                },
            },
        ],
    },
    {
        name: 'Hide Oxacillin',
        id: 'RaNe1V1zT4R',
        condition:
            "values['SaQe2REkGVw'] == 'SPE' || values['SaQe2REkGVw'] == 'SEP' || values['SaQe2REkGVw'] == 'SHL' || values['SaQe2REkGVw'] == 'SHO' || values['SaQe2REkGVw'] == 'SAP' || values['SaQe2REkGVw'] == 'STA' || values['SaQe2REkGVw'] == ' SAU' || values['SaQe2REkGVw'] == 'SLU'",
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'Om48umoRDNO',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'Ou3P4jx4uuR',
                },
            },
            {
                id: 'YTu8UTutlln',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'Al6e3U8AznW',
                },
            },
        ],
    },
    {
        name: 'Hide AMR Id',
        id: 'GOfQyu2wMVZ',
        condition: "values['lIkk661BLpG'] ==''",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'oyguy1zUxQS',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'lIkk661BLpG',
                },
            },
        ],
    },
    {
        name: 'Hide Piperacillin tazobactam',
        id: 'oC5XJ00PwpB',
        condition:
            " values['SaQe2REkGVw']=='PMA' || values['SaQe2REkGVw']=='PCE' || values['SaQe2REkGVw']=='SPN'",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'U73TTMqsdg5',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'LX2UJgFtmhE',
                },
            },
            {
                id: 'fjAuMNdPCWt',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'j7Oenm7cXWx',
                },
            },
            {
                id: 'vNE11P6j2aJ',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'LX2UJgFtmhE',
                },
            },
        ],
    },
    {
        name: 'Hide AMR Id',
        id: 'FB4CaEsDJdS',
        condition: "values['lIkk661BLpG'] ==''",
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'al18Ohgjpl1',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'lIkk661BLpG',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 4',
        id: 'FdlD4esHiaT',
        condition: "values['khMMIiU2Zwa'] ==''",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'obBIf3CahdD',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'kH30plwbeAP',
                },
            },
        ],
    },
    {
        name: 'Hide AMR Id',
        id: 'hZqaV7FGmxJ',
        condition: "values['lIkk661BLpG'] ==''",
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'Uzw2VbWighu',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'lIkk661BLpG',
                },
            },
        ],
    },
    {
        name: 'Hide rejected level 1 reason',
        id: 'ma6QJLQ4Cb8',
        condition: "values['tAyVrNUTVHX'] !='Rejected'",
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'lZOej2a4kuP',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'NLmLwjdSHMv',
                },
            },
        ],
    },
    {
        name: 'Hide Amphotericin B',
        id: 'KYU6KJeDfYU',
        condition:
            "values['SaQe2REkGVw'] == 'BLA' || values['SaQe2REkGVw'] == 'CAL' || values['SaQe2REkGVw'] == 'CAA' || values['SaQe2REkGVw'] == 'CCT' || values['SaQe2REkGVw'] == 'CCP' || values['SaQe2REkGVw'] == 'TCA' || values['SaQe2REkGVw'] == 'THA' || values['SaQe2REkGVw'] == 'CIN' || values['SaQe2REkGVw'] == 'CPS' || values['SaQe2REkGVw'] == 'CLP' || values['SaQe2REkGVw'] == 'CLU' || values['SaQe2REkGVw'] == 'CAN' || values['SaQe2REkGVw'] == 'CPR' || values['SaQe2REkGVw'] == 'CNP' || values['SaQe2REkGVw'] == 'CRU' || values['SaQe2REkGVw'] == 'CTR' || values['SaQe2REkGVw'] == 'CUT' || values['SaQe2REkGVw'] == 'CAV' || values['SaQe2REkGVw'] == 'CNE' || values['SaQe2REkGVw'] == 'CGT' || values['SaQe2REkGVw'] == 'CNG' || values['SaQe2REkGVw'] == 'DBH' || values['SaQe2REkGVw'] == 'KOH' || values['SaQe2REkGVw'] == 'PIF' || values['SaQe2REkGVw'] == 'PIJ' || values['SaQe2REkGVw'] == 'PIK' || values['SaQe2REkGVw'] == 'SHG' || values['SaQe2REkGVw'] == 'PSA' || values['SaQe2REkGVw'] == 'PSC' || values['SaQe2REkGVw'] == 'RGL' || values['SaQe2REkGVw'] == 'RRU' || values['SaQe2REkGVw'] == 'SCE' || values['SaQe2REkGVw'] == 'TAS' || values['SaQe2REkGVw'] == 'TMU' || values['SaQe2REkGVw'] == 'WAN' || values['SaQe2REkGVw'] == 'CGL' || values['SaQe2REkGVw'] == 'CPA' || values['SaQe2REkGVw'] == 'CKR' || values['SaQe2REkGVw'] == 'CGU' || values['SaQe2REkGVw'] == 'ATE' || values['SaQe2REkGVw'] == 'AND'",
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'mUDYSohaoNi',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'dq8ORL3DxkI',
                },
            },
            {
                id: 'wZSTZCSjmge',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'bE5meXeHH3H',
                },
            },
        ],
    },
    {
        name: 'Hide Isolate transfer',
        id: 'kRh1x3x2sn7',
        condition: 'true',
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'j2LZu0exQrd',
                programRuleActionType: 'HIDESECTION',
                programStageSection: {
                    id: 'Id0AOZGLJiG',
                },
            },
        ],
    },
    {
        name: 'Hide Amikacin',
        id: 'FHQDgrjEKFZ',
        condition:
            "values['SaQe2REkGVw'] == 'PMA' || values['SaQe2REkGVw'] == 'PCE' || values['SaQe2REkGVw']=='SPN'",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'ILvBYP8349N',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'GYNpOJWcNx2',
                },
            },
            {
                id: 'P99fE7WmTfe',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'VGdJnkTlNyK',
                },
            },
        ],
    },
    {
        name: 'Hide devices others',
        id: 'dwVlMcJV5da',
        condition: "values['h9RODgVF4O1'] != 'true'",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'KeAF9Ub1KUY',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'h9RODgVF4O1',
                },
            },
        ],
    },
    {
        name: 'Show Enterobacteriaceae organisms',
        id: 'PvTF2zKsZQx',
        condition: 'true',
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'e1SF3Jybz2z',
                programRuleActionType: 'SHOWOPTIONGROUP',
                optionGroup: {
                    id: 's7YngGChrdh',
                },
                dataElement: {
                    id: 'SaQe2REkGVw',
                },
            },
        ],
    },
    {
        name: 'Hide Levofloxacin',
        id: 'Ea8Ca69b9G7',
        condition:
            "values['SaQe2REkGVw'] == 'PMA' || values['SaQe2REkGVw']=='PCE' || values['SaQe2REkGVw']=='SPN' ",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'PqK9jZPRHHN',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'E7EyQm7euHu',
                },
            },
        ],
    },
    {
        name: 'Show Enterococci organisms',
        id: 'bI2zfPBUmpH',
        condition: 'true',
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'Q49kiLWHxmK',
                programRuleActionType: 'SHOWOPTIONGROUP',
                optionGroup: {
                    id: 'OCKayxTeVw1',
                },
                dataElement: {
                    id: 'SaQe2REkGVw',
                },
            },
        ],
    },
    {
        name: 'Hide Ciprofloxacin',
        id: 'CAXKEKF1oR9',
        condition:
            "values['SaQe2REkGVw'] == 'ECOD' || values['SaQe2REkGVw'] == 'SHC' || values['SaQe2REkGVw'] == 'SHA' || values['SaQe2REkGVw'] == 'SHB' || values['SaQe2REkGVw'] == 'SHD' || values['SaQe2REkGVw'] == 'SHI' || values['SaQe2REkGVw'] == 'VIC' || values['SaQe2REkGVw'] == 'VIP' || values['SaQe2REkGVw'] == 'VI-'",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'ixi7ZqPmmxC',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'f666SCFrjuM',
                },
            },
            {
                id: 'YMHknrFIo3C',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'nikrSOx63ce',
                },
            },
        ],
    },
    {
        name: 'Show Faecal isolates organisms',
        id: 'E2uGhNePCiJ',
        condition: 'true',
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'PCYOSymXgCl',
                programRuleActionType: 'SHOWOPTIONGROUP',
                optionGroup: {
                    id: 'CJeUs4ZlkgA',
                },
                dataElement: {
                    id: 'SaQe2REkGVw',
                },
            },
        ],
    },
    {
        name: 'Hide Cefixime',
        id: 'rwU1R4O1TXQ',
        condition:
            "values['SaQe2REkGVw'] == 'ARI' || values['SaQe2REkGVw'] == 'SEN' || values['SaQe2REkGVw'] == 'SHG' || values['SaQe2REkGVw'] == 'SNE' || values['SaQe2REkGVw'] == 'SAF' || values['SaQe2REkGVw'] == 'STM' || values['SaQe2REkGVw'] == 'VIC' || values['SaQe2REkGVw'] == 'VIP' || values['SaQe2REkGVw'] == 'VI-' ",
        program: {
            id: 'STe7Xraobt2',
        },
        programRuleActions: [
            {
                id: 'xEzOgqDBj7A',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'YevRvdwsL3o',
                },
            },
            {
                id: 'ZIyYLB4RuDe',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'PiJ9IwbEtZi',
                },
            },
        ],
    },
    {
        name: 'Show Fungal isolates organisms',
        id: 'llhnnbOQg4O',
        condition: 'true',
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'PsCrXN8A1A1',
                programRuleActionType: 'SHOWOPTIONGROUP',
                optionGroup: {
                    id: 'y0K2EXoTiMJ',
                },
                dataElement: {
                    id: 'SaQe2REkGVw',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 5',
        id: 'dR3kGjefMus',
        condition: "values['kH30plwbeAP'] ==''",
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'bU5Ome6P3sv',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'kAOxkp1lQdB',
                },
            },
        ],
    },
    {
        name: 'Show NFGNB organisms',
        id: 'Zs2kWAvLwt3',
        condition: 'true',
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'qKPngWPudwE',
                programRuleActionType: 'SHOWOPTIONGROUP',
                optionGroup: {
                    id: 'gMBSG1eCxPr',
                },
                dataElement: {
                    id: 'SaQe2REkGVw',
                },
            },
        ],
    },
    {
        name: 'Hide rejected level 1 reason',
        id: 'TjC9I52YxtT',
        condition: "values['tAyVrNUTVHX'] !='Rejected'",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'Pwk5VRDaTfL',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'NLmLwjdSHMv',
                },
            },
        ],
    },
    {
        name: 'Show non-urine samples',
        id: 'bCV67bYyjVa',
        condition: 'true',
        programStage: {
            id: 'dyWSTPoKXnp',
        },
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'TpV3ievmwXp',
                programRuleActionType: 'SHOWOPTIONGROUP',
                optionGroup: {
                    id: 'Sru2jIeaUCY',
                },
                dataElement: {
                    id: 'mp5MeJ2dFQz',
                },
            },
        ],
    },
    {
        name: 'Hide isolate transfer',
        id: 'kkvetWefbGF',
        condition: 'true',
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'dKI3Vadxvoe',
                programRuleActionType: 'HIDESECTION',
                programStageSection: {
                    id: 'l4762Lnrz0t',
                },
            },
        ],
    },
    {
        name: 'Hide comorbidity others',
        id: 'KljCpJWzRua',
        condition: "values['V0C17jO5GqO'] != 'true'",
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'Rc2yXoPrdyH',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'CqyqhAIuUSP',
                },
            },
        ],
    },
    {
        name: 'Show urine samples',
        id: 'UwqHg0J2C4U',
        condition: 'true',
        programStage: {
            id: 'xnUTNC3qxp2',
        },
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'HOFgjWH7vDs',
                programRuleActionType: 'SHOWOPTIONGROUP',
                optionGroup: {
                    id: 'ZAZ0x81n1G6',
                },
                dataElement: {
                    id: 'mp5MeJ2dFQz',
                },
            },
        ],
    },
    {
        name: 'Show Staphylococci organisms',
        id: 'vxNXB47yQk3',
        condition: 'true',
        program: {
            id: 'BUfpwe2iUQb',
        },
        programRuleActions: [
            {
                id: 'uBtOSdehOkJ',
                programRuleActionType: 'SHOWOPTIONGROUP',
                optionGroup: {
                    id: 'gfNec1Pj0RP',
                },
                dataElement: {
                    id: 'SaQe2REkGVw',
                },
            },
        ],
    },
    {
        name: 'Show Salmonella organisms',
        id: 'ZyxqmL1QgCa',
        condition: 'true',
        program: {
            id: 'Bj4ZJzd9Uz9',
        },
        programRuleActions: [
            {
                id: 'lzDl6UPyeg3',
                programRuleActionType: 'SHOWOPTIONGROUP',
                optionGroup: {
                    id: 'CSBX7nJ6IK7',
                },
                dataElement: {
                    id: 'SaQe2REkGVw',
                },
            },
        ],
    },
    {
        name: 'Show non-urine samples',
        id: 's7IsuiPpkI8',
        condition: 'true',
        programStage: {
            id: 'Q3UjBKHk5St',
        },
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'KYVDX9h1Pyc',
                programRuleActionType: 'SHOWOPTIONGROUP',
                optionGroup: {
                    id: 'Sru2jIeaUCY',
                },
                dataElement: {
                    id: 'mp5MeJ2dFQz',
                },
            },
        ],
    },
    {
        name: 'Hide Chloramphenicol',
        id: 'MCnH6Fr0ejR',
        condition:
            "values['SaQe2REkGVw'] == 'PAE' || values['SaQe2REkGVw']=='ABA' || values['SaQe2REkGVw']=='ACA' || values['SaQe2REkGVw']=='ALW' || values['SaQe2REkGVw']=='AC-' || values['SaQe2REkGVw']=='BCE'",
        program: {
            id: 'h6EWlNCpHTz',
        },
        programRuleActions: [
            {
                id: 'LLNEQIeCxJU',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'gnjCD7h8Dm8',
                },
            },
        ],
    },
    {
        name: 'Hide level 2 section',
        id: 'WMLpLGA75vQ',
        condition: "values['tAyVrNUTVHX'] !='Approved'",
        program: {
            id: 'gPO5iFsfu3S',
        },
        programRuleActions: [
            {
                id: 'nlIIPhVxsGf',
                programRuleActionType: 'HIDESECTION',
                programStageSection: {
                    id: 'Q2ZP7Rn5vx0',
                },
            },
        ],
    },
    {
        name: 'Hide devices others',
        id: 'UczdmHm39k7',
        condition: "values['h9RODgVF4O1'] != 'true'",
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'py9f0mIHIMl',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'h9RODgVF4O1',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 4',
        id: 'vdqfORX33Xi',
        condition: "values['khMMIiU2Zwa'] ==''",
        program: {
            id: 'rMiBliR4FGr',
        },
        programRuleActions: [
            {
                id: 'Xcmpr1q27IS',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'kH30plwbeAP',
                },
            },
        ],
    },
    {
        name: 'Hide antibiotic 5',
        id: 'Ix6x3tBxfHA',
        condition: "values['kH30plwbeAP'] ==''",
        program: {
            id: 'dzizG8i1cmP',
        },
        programRuleActions: [
            {
                id: 'CvftCh7l6IM',
                programRuleActionType: 'HIDEFIELD',
                dataElement: {
                    id: 'kAOxkp1lQdB',
                },
            },
        ],
    },
]
