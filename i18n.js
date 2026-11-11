/* ============================================================
 * 自己人 · 年底礼品分拣 — 三语字典（zh / en / ja）
 * 纯数据文件，无 DOM 依赖；挂到 window.I18N
 * ============================================================ */
(function () {
  'use strict';

  const I18N = {
    /* ============================ 简体中文 ============================ */
    zh: {
      docTitle: '自己人 · 年底礼品分拣',
      ui: {
        signBrand: '星潮科技',
        signSub: 'XINGCHAO TECH · ADMIN',
        returnLabel: '退回',
        returnSub: 'RETURN',
        calRenew: '距离续签',
        calDays: '21 天',
        hrTag: 'HR 总监',
        brandMini: '星潮科技 · 行政部',
        unit: '份',
        penaltyTitle: '暂停分拣',
        penaltyResume: '秒后恢复',
        gift: '年货',
        kicker: '星潮科技 · 行政部 · 临时工位',
        oss: '非商用开源 · 无赞助 / 无引流 / 无盈利',
        h1: '自己人',
        sub: '年底礼品分拣',
        lede: '60 秒，按工牌最下方的「签约主体」分拣年货，正确数量没有上限。头像、颜色、卡套和岗位都不是判断依据。',
        ruleLeft: '往左发',
        ruleLeftBody: '星潮科技 + 曜辰 / 瀚海 / 赤曜 / 青梧 <i>· 正编 / 实习 / 合作方</i>',
        ruleRight: '往右退回',
        ruleRightBody: '其他签约主体 <i>· 内包 / 外包 / 服务商</i>',
        rulePause: '错后暂停',
        rulePauseBody: '暂停分拣 4 秒，倒计时结束后继续；拖动工牌到左右两侧即可操作。',
        keyHint: '<kbd>←</kbd> 往左发 · <kbd>→</kbd> 往右退回，键盘也能分拣',
        nameLabel: '工牌姓名',
        namePlaceholder: '临时工',
        zenBtn: '自己先拿一箱',
        startBtn: '开始发放',
        rankBtn: '榜单',
        foot: '<b>非商用开源作品，无赞助、无引流、无盈利。</b><br>公司、人物、工牌均为虚构；榜单为本地演示数据，不含真实用户信息。',
        ruleStamp: '唯一依据<br>签约主体',
        rankTitle: '榜单',
        demoTag: '演示数据',
        tabDay: '今日',
        tabAll: '总榜',
        rankNote: '演示榜单：本机数据 + 预设对手',
        posterTitle: '分享海报',
        savePng: '保存图片',
        copyTx: '复制文案'
      },

      /* 工牌上的公司信息（key 对应公共 CO/PARTNERS 的 co） */
      badges: {
        xc: { entity: '星潮科技有限公司', brand: '星潮科技', en: 'XINGCHAO TECH', strip: '星潮科技 · XINGCHAO TECH · ' },
        hz: { entity: '星潮云服（杭州）有限公司', brand: '星潮科技', en: 'XINGCHAO TECH', strip: '星潮云服 · XINGCHAO CLOUD · ' },
        lh: { entity: '蓝海人力资源服务有限公司', brand: '星潮科技', en: 'XINGCHAO TECH', strip: '蓝海人力 · LANHAI HR · ' },
        zy: { entity: '智云企业服务有限公司', brand: '智云服务', en: 'ZHIYUN SERVICE', strip: '智云服务 · ZHIYUN SERVICE · ' },
        yc: { entity: '曜辰互动科技有限公司', brand: '曜辰科技', en: 'YAOCHEN TECH', strip: '曜辰科技 · YAOCHEN TECH · ' },
        hh: { entity: '瀚海云科有限公司', brand: '瀚海科技', en: 'HANHAI CLOUD', strip: '瀚海科技 · HANHAI CLOUD · ' },
        cy: { entity: '赤曜互动娱乐有限公司', brand: '赤曜互动', en: 'CHIYAO INTERACTIVE', strip: '赤曜互动 · CHIYAO INTERACTIVE · ' },
        qw: { entity: '青梧数科有限公司', brand: '青梧数科', en: 'QINGWU DATA', strip: '青梧数科 · QINGWU DATA · ' }
      },

      names: [
        ['林思远', 'lin.sy'], ['周雨桐', 'zhou.yt'], ['陈嘉禾', 'chen.jh'], ['徐子墨', 'xu.zm'],
        ['何欣然', 'he.xr'], ['赵一鸣', 'zhao.ym'], ['沈知微', 'shen.zw'], ['高远', 'gao.y'],
        ['唐若琳', 'tang.rl'], ['韩叙', 'han.x'], ['苏晓', 'su.x'], ['程野', 'cheng.y'],
        ['罗一楠', 'luo.yn'], ['蒋珂', 'jiang.k'], ['邱泽', 'qiu.z'], ['白露', 'bai.l'],
        ['孟凡', 'meng.f'], ['段思聪', 'duan.sc'], ['顾清', 'gu.q'], ['叶南', 'ye.n']
      ],

      roles: {
        ft: [['P7 高级工程师', '平台研发部'], ['P6 产品经理', '产品部'], ['P6 品牌经理', '市场部'], ['P5 财务专员', '财务部'], ['P6 视觉设计师', '设计中心'], ['P7 数据分析师', '数据平台部']],
        intern: [['实习生', '平台研发部'], ['实习生', '产品部'], ['实习生', '市场部'], ['实习生', '设计中心']],
        ins: [['P7 高级工程师', '平台研发部'], ['P6 产品经理', '产品部'], ['P6 数据分析师', '数据平台部'], ['P5 运营专员', '增长运营部']],
        out: [['行政专员（驻场）', '行政支持部'], ['客服专员（驻场）', '客服中心'], ['审核专员（驻场）', '内容审核部'], ['桌面运维（驻场）', 'IT 运维部']],
        sp: [['保洁员', '物业服务'], ['安保员', '安保服务'], ['维修工', '设施服务'], ['前台', '行政服务']],
        pt: [['P8 高级工程师', '平台研发部'], ['P7 产品经理', '产品部'], ['P7 数据分析师', '数据平台部'], ['P6 视觉设计师', '设计中心'], ['P6 运营经理', '增长运营部']]
      },

      titles: ['还没转正', '外包行政', '内包行政', '行政专员', '福利专员', '礼盒管理员', '签收单之神', '成本控制鬼才', 'HRBP', '行政总监', '工会主席'],

      drill: [
        '正编：签约主体「星潮科技有限公司」→ 往左发',
        '实习生也签在星潮科技 → 往左发',
        '合作方大厂也有年货：看清品牌与签约主体 → 往左发',
        '蓝海人力是供应商 → 往右退回',
        '内包签的是「星潮云服（杭州）」→ 往右退回',
        '服务商「智云企业服务」→ 往右退回'
      ],

      why: {
        prefix: '错了。',
        out: '蓝海人力不是星潮科技',
        ins: '内包签的是星潮云服',
        sp: '智云是服务商，不是自己人',
        pt: '合作方大厂也有年货，该往左发',
        def: '签在星潮科技，该往左发'
      },

      hrWho: 'HR 总监',
      finishDlg: {
        line1: '礼品都发完了？',
        line2: '这几箱，你发给谁了？',
        lastBad: '数目对不上。你是哪家公司签的？',
        lastGood: '数目对得上。辛苦了。',
        lastOk: '数目对得上。'
      },
      zenDlg: { line1: '这箱，是给外包的吗？', line2: '外包没有。' },

      badge: {
        staffTag: '员工 / STAFF',
        entityLabel: '签约主体',
        staffId: '员工工牌 · STAFF ID',
        defaultName: '临时工',
        backBrand: '星潮科技',
        backSub: 'STAFF'
      },

      result: {
        zenTitle: '解除',
        stampZero: '零差错',
        stampPass: '通过',
        stampReview: '待核',
        quoteZen: '外包没有。',
        quoteZero: '数目对得上。',
        quoteFast: '发得挺快，就是有几箱对不上。',
        quoteElse: '你先说说，这些签收单是谁签的？',
        scoreUnit: '份',
        cherryUnit: '箱车厘子',
        kickerZen: '年底盘点 · 特别结局',
        kickerNormal: '今日结算 · 行政部',
        msgZen: '那箱车厘子，你已经搬回家了。',
        msgNormal: '工牌上的字，比你想的多。',
        rTaken: '拿走年货',
        rRenewal: '续签资格',
        rVerdict: 'HR 总监的评价',
        rCorrect: '正确分拣',
        rWrongSent: '错发出去的年货',
        rWrongReturned: '该发却退回仓库的',
        rBest: '本机最好成绩',
        renewRevoked: '已解除',
        btnAgain: '再发一次',
        btnRank: '榜单',
        btnPoster: '分享海报',
        btnHome: '返回首页',
        bestLine: '最好成绩 {n} 份 · {title}',
        bestLineSuffix: ' · 演示榜单不含真实用户'
      },

      rank: {
        me: '你',
        err: '错 {m}',
        empty: '还没有人发货',
        zenRow: '因为一箱车厘子失去续签资格的人 {n} 人',
        note: '演示榜单：本机最好成绩 + 预设对手，无真实用户数据。',
        botsDay: [
          { n: '不想加班的阿May', s: 48, m: 0 }, { n: '行政部小王', s: 46, m: 1 }, { n: '外包也是人', s: 44, m: 0 },
          { n: '年货搬运工', s: 43, m: 2 }, { n: '蓝海驻场老张', s: 41, m: 1 }, { n: '只想拿车厘子', s: 39, m: 0 },
          { n: '内包不是自己人', s: 37, m: 2 }, { n: '物业老陈', s: 36, m: 1 }, { n: 'HR总监本人', s: 35, m: 0 }
        ],
        botsAll: [
          { n: '签收单之神', s: 59, m: 0 }, { n: '工会主席', s: 57, m: 1 }, { n: '年底冲业绩', s: 56, m: 0 },
          { n: '表格战神', s: 54, m: 3 }, { n: '蓝海老兵', s: 52, m: 1 }, { n: '已转正', s: 50, m: 0 },
          { n: '行政总监', s: 49, m: 2 }, { n: '不想加班', s: 47, m: 0 }, { n: '车厘子自由', s: 45, m: 1 },
          { n: '实习生小周', s: 43, m: 0 }
        ]
      },

      poster: {
        pBrand: '星 潮 科 技 · 行 政 部',
        pH1: '自己人',
        pSub: '年底礼品分拣',
        pQuoteZen: '「外包没有。」',
        pQuoteOk: '「数目对得上。」',
        pZenLine: '特别结局 · 拿走一箱车厘子',
        pCorrectLine: '本次正确发放',
        pUnitBox: '箱',
        pUnitFen: '份',
        pErrLine: '错发 {a} 份 · 错退 {b} 份',
        pScan: '扫码来发年货',
        pAlt: '《自己人》· 年底礼品分拣',
        pDisclaimer: '本作公司、人物、工牌均为虚构；榜单为本地演示数据。',
        pTitle2: '《自己人》',
        pCredit: '插画素材：いらすとや',
        pbBrand: '星潮科技',
        pbBrandEn: 'X I N G C H A O   T E C H',
        pbStaff: '员工 / STAFF',
        pbRole: '行政专员（驻场） · 行政支持部',
        pbId: 'ID OD-8827',
        pbMail: 'admin.temp@lanhai-hr.com',
        pbEntityLabel: '签 约 主 体',
        pbEntity: '蓝海人力资源服务有限公司',
        pbStaffId: 'STAFF ID · 员工工牌'
      },

      misc: {
        copied: '文案已复制',
        copyFail: '复制失败，请手动选择',
        saveFail: '当前浏览器不支持保存，请长按图片',
        filePrefix: '自己人',
        shareText: '我在《自己人》发了 {n} 份年货，称号「{t}」。错发 {a} 份，错退 {b} 份。来试试你能认出几个自己人。'
      }
    },

    /* ============================ English ============================ */
    en: {
      docTitle: 'ONE OF US · Year-End Gift Sorting',
      ui: {
        signBrand: 'Xingchao Tech',
        signSub: 'XINGCHAO TECH · ADMIN',
        returnLabel: 'Return',
        returnSub: 'RETURN',
        calRenew: 'To renewal',
        calDays: '21 days',
        hrTag: 'HR Director',
        brandMini: 'Xingchao Tech · Admin',
        unit: 'items',
        penaltyTitle: 'Sorting paused',
        penaltyResume: 's to resume',
        gift: 'Gifts',
        kicker: 'Xingchao Tech · Admin Dept · Temp Desk',
        oss: 'Non-commercial · No sponsors / No referrals / No profit',
        h1: 'ONE OF US',
        sub: 'Year-End Gift Sorting',
        lede: 'In 60 seconds, sort the year-end gifts by the "Contracting Entity" printed at the bottom of each badge. There is no limit on correct answers. Avatar, lanyard color, card holder and job title are not evidence.',
        ruleLeft: 'Send left',
        ruleLeftBody: 'Xingchao Tech + Yaochen / Hanhai / Chiyao / Qingwu <i>· Full-time / Intern / Partner</i>',
        ruleRight: 'Return right',
        ruleRightBody: 'Other contracting entities <i>· In-house / Outsourced / Vendor</i>',
        rulePause: 'Pause on error',
        rulePauseBody: 'Sorting pauses for 4 seconds, then resumes automatically. Drag the badge to either side to act.',
        keyHint: '<kbd>←</kbd> send left · <kbd>→</kbd> return right — keyboard supported',
        nameLabel: 'Badge name',
        namePlaceholder: 'Temp',
        zenBtn: 'Grab a box for myself',
        startBtn: 'Start Sorting',
        rankBtn: 'Leaderboard',
        foot: '<b>Non-commercial open-source project: no sponsors, no referrals, no profit.</b><br>All companies, people and badges are fictional. The leaderboard uses local demo data with no real user information.',
        ruleStamp: 'Only evidence<br>Contracting Entity',
        rankTitle: 'Leaderboard',
        demoTag: 'Demo data',
        tabDay: 'Today',
        tabAll: 'All-time',
        rankNote: 'Demo board: local data + preset rivals',
        posterTitle: 'Share Poster',
        savePng: 'Save Image',
        copyTx: 'Copy Text'
      },

      badges: {
        xc: { entity: 'Xingchao Technology Co., Ltd.', brand: 'Xingchao Tech', en: 'XINGCHAO TECH', strip: 'Xingchao Tech · XINGCHAO TECH · ' },
        hz: { entity: 'Xingchao Cloud (Hangzhou) Co., Ltd.', brand: 'Xingchao Tech', en: 'XINGCHAO TECH', strip: 'Xingchao Cloud · XINGCHAO CLOUD · ' },
        lh: { entity: 'Lanhai HR Services Co., Ltd.', brand: 'Xingchao Tech', en: 'XINGCHAO TECH', strip: 'Lanhai HR · LANHAI HR · ' },
        zy: { entity: 'Zhiyun Enterprise Services Co., Ltd.', brand: 'Zhiyun Service', en: 'ZHIYUN SERVICE', strip: 'Zhiyun Service · ZHIYUN SERVICE · ' },
        yc: { entity: 'Yaochen Interactive Technology Co., Ltd.', brand: 'Yaochen Tech', en: 'YAOCHEN TECH', strip: 'Yaochen Tech · YAOCHEN TECH · ' },
        hh: { entity: 'Hanhai Cloud Technology Co., Ltd.', brand: 'Hanhai Cloud', en: 'HANHAI CLOUD', strip: 'Hanhai Cloud · HANHAI CLOUD · ' },
        cy: { entity: 'ChiYao Interactive Entertainment Co., Ltd.', brand: 'ChiYao Interactive', en: 'CHIYAO INTERACTIVE', strip: 'ChiYao Interactive · CHIYAO INTERACTIVE · ' },
        qw: { entity: 'Qingwu Data Technology Co., Ltd.', brand: 'Qingwu Data', en: 'QINGWU DATA', strip: 'Qingwu Data · QINGWU DATA · ' }
      },

      names: [
        ['Alex Lin', 'alex.lin'], ['Bella Zhou', 'bella.zhou'], ['Chris Chen', 'chris.chen'], ['Daniel Xu', 'daniel.xu'],
        ['Emma He', 'emma.he'], ['Frank Zhao', 'frank.zhao'], ['Grace Shen', 'grace.shen'], ['Henry Gao', 'henry.gao'],
        ['Tina Tang', 'tina.tang'], ['Kevin Han', 'kevin.han'], ['Sophie Su', 'sophie.su'], ['Leo Cheng', 'leo.cheng'],
        ['Nancy Luo', 'nancy.luo'], ['Jack Jiang', 'jack.jiang'], ['Ryan Qiu', 'ryan.qiu'], ['Lucy Bai', 'lucy.bai'],
        ['Mike Meng', 'mike.meng'], ['Diana Duan', 'diana.duan'], ['Oscar Gu', 'oscar.gu'], ['Nora Ye', 'nora.ye']
      ],

      roles: {
        ft: [['P7 Senior Engineer', 'Platform R&D'], ['P6 Product Manager', 'Product'], ['P6 Brand Manager', 'Marketing'], ['P5 Finance Specialist', 'Finance'], ['P6 Visual Designer', 'Design Center'], ['P7 Data Analyst', 'Data Platform']],
        intern: [['Intern', 'Platform R&D'], ['Intern', 'Product'], ['Intern', 'Marketing'], ['Intern', 'Design Center']],
        ins: [['P7 Senior Engineer', 'Platform R&D'], ['P6 Product Manager', 'Product'], ['P6 Data Analyst', 'Data Platform'], ['P5 Operations Specialist', 'Growth Ops']],
        out: [['On-site Admin Specialist', 'Admin Support'], ['On-site Support Rep', 'Support Center'], ['On-site Content Moderator', 'Content Review'], ['On-site IT Support', 'IT Ops']],
        sp: [['Cleaner', 'Property Service'], ['Security Guard', 'Security'], ['Maintenance Worker', 'Facilities'], ['Receptionist', 'Admin Service']],
        pt: [['P8 Senior Engineer', 'Platform R&D'], ['P7 Product Manager', 'Product'], ['P7 Data Analyst', 'Data Platform'], ['P6 Visual Designer', 'Design Center'], ['P6 Operations Manager', 'Growth Ops']]
      },

      titles: ['Not Yet Permanent', 'Outsourced Admin', 'In-house Admin', 'Admin Specialist', 'Benefits Specialist', 'Gift Box Manager', 'God of Delivery Slips', 'Cost Control Genius', 'HRBP', 'Admin Director', 'Union Chair'],

      drill: [
        'Full-time: entity "Xingchao Technology Co., Ltd." → send left',
        'Interns are also signed with Xingchao → send left',
        'Partners get gifts too: check brand and entity → send left',
        'Lanhai HR is a vendor → return right',
        'In-house staff are signed with "Xingchao Cloud (Hangzhou)" → return right',
        'Service vendor "Zhiyun Enterprise Services" → return right'
      ],

      why: {
        prefix: 'Wrong. ',
        out: 'Lanhai HR is not Xingchao Tech',
        ins: 'In-house staff are signed with Xingchao Cloud',
        sp: 'Zhiyun is a service vendor, not one of us',
        pt: 'Partners get gifts too — send it left',
        def: 'Signed with Xingchao Tech — send it left'
      },

      hrWho: 'HR Director',
      finishDlg: {
        line1: 'All the gifts sent out?',
        line2: 'Who did you send these boxes to?',
        lastBad: 'The numbers don\u2019t add up. Which company signed you?',
        lastGood: 'Numbers check out. Good work.',
        lastOk: 'Numbers check out.'
      },
      zenDlg: { line1: 'Is this box for the outsourced team?', line2: 'No gifts for outsourced staff.' },

      badge: {
        staffTag: 'EMPLOYEE / STAFF',
        entityLabel: 'Contracting Entity',
        staffId: 'EMPLOYEE BADGE · STAFF ID',
        defaultName: 'Temp',
        backBrand: 'Xingchao Tech',
        backSub: 'STAFF'
      },

      result: {
        zenTitle: 'Revoked',
        stampZero: 'Zero Errors',
        stampPass: 'Passed',
        stampReview: 'Pending',
        quoteZen: 'No gifts for outsourced staff.',
        quoteZero: 'Numbers check out.',
        quoteFast: 'Fast work, but a few boxes don\u2019t match.',
        quoteElse: 'First tell me — who signed these delivery slips?',
        scoreUnit: 'items',
        cherryUnit: 'box of cherries',
        kickerZen: 'Year-End Audit · Special Ending',
        kickerNormal: 'Today\u2019s Settlement · Admin Dept',
        msgZen: 'That box of cherries is already back at your place.',
        msgNormal: 'The badge says more than you think.',
        rTaken: 'Gifts taken',
        rRenewal: 'Renewal eligibility',
        rVerdict: 'HR Director\u2019s verdict',
        rCorrect: 'Correct sorts',
        rWrongSent: 'Gifts wrongly sent',
        rWrongReturned: 'Wrongly returned to stock',
        rBest: 'Best on this device',
        renewRevoked: 'Revoked',
        btnAgain: 'Sort Again',
        btnRank: 'Leaderboard',
        btnPoster: 'Share Poster',
        btnHome: 'Home',
        bestLine: 'Best {n} {unit} · {title}',
        bestLineSuffix: ' · Demo board, no real users'
      },

      rank: {
        me: 'You',
        err: '{m} err',
        empty: 'No one has shipped yet',
        zenRow: '{n} people lost renewal over a box of cherries',
        note: 'Demo board: local best score + preset rivals, no real user data.',
        botsDay: [
          { n: 'May Who Hates Overtime', s: 48, m: 0 }, { n: 'Admin Xiao Wang', s: 46, m: 1 }, { n: 'Outsourced Are People Too', s: 44, m: 0 },
          { n: 'Gift Hauler', s: 43, m: 2 }, { n: 'Old Zhang (Lanhai On-site)', s: 41, m: 1 }, { n: 'Here for the Cherries', s: 39, m: 0 },
          { n: 'In-house Isn\u2019t Family', s: 37, m: 2 }, { n: 'Property Old Chen', s: 36, m: 1 }, { n: 'The HR Director Herself', s: 35, m: 0 }
        ],
        botsAll: [
          { n: 'God of Delivery Slips', s: 59, m: 0 }, { n: 'Union Chair', s: 57, m: 1 }, { n: 'Year-End Push', s: 56, m: 0 },
          { n: 'Spreadsheet Warrior', s: 54, m: 3 }, { n: 'Lanhai Veteran', s: 52, m: 1 }, { n: 'Made Permanent', s: 50, m: 0 },
          { n: 'Admin Director', s: 49, m: 2 }, { n: 'No Overtime', s: 47, m: 0 }, { n: 'Cherry Freedom', s: 45, m: 1 },
          { n: 'Intern Xiao Zhou', s: 43, m: 0 }
        ]
      },

      poster: {
        pBrand: 'XINGCHAO TECH · ADMIN DEPT',
        pH1: 'ONE OF US',
        pSub: 'Year-End Gift Sorting',
        pQuoteZen: '\u201cNo gifts for outsourced staff.\u201d',
        pQuoteOk: '\u201cNumbers check out.\u201d',
        pZenLine: 'Special Ending · Took a box of cherries',
        pCorrectLine: 'Correctly sent this round',
        pUnitBox: 'box',
        pUnitFen: 'items',
        pErrLine: 'Wrongly sent {a} · Wrongly returned {b}',
        pScan: 'Scan to sort gifts',
        pAlt: '"ONE OF US" · Year-End Gift Sorting',
        pDisclaimer: 'Fictional companies and people; local demo data only.',
        pTitle2: '"ONE OF US"',
        pCredit: 'Illustrations: Irasutoya',
        pbBrand: 'Xingchao Tech',
        pbBrandEn: 'X I N G C H A O   T E C H',
        pbStaff: 'EMPLOYEE / STAFF',
        pbRole: 'On-site Admin Specialist · Admin Support',
        pbId: 'ID OD-8827',
        pbMail: 'admin.temp@lanhai-hr.com',
        pbEntityLabel: 'CONTRACTING ENTITY',
        pbEntity: 'Lanhai HR Services Co., Ltd.',
        pbStaffId: 'STAFF ID · EMPLOYEE BADGE'
      },

      misc: {
        copied: 'Text copied',
        copyFail: 'Copy failed, please select manually',
        saveFail: 'Saving not supported in this browser, long-press the image',
        filePrefix: 'one-of-us',
        shareText: 'I sorted {n} year-end gifts in "ONE OF US", earning the title "{t}". {a} wrong sends, {b} wrong returns. See how many insiders you can spot.'
      }
    },

    /* ============================ 日本語 ============================ */
    ja: {
      docTitle: '仲間 · 年末ギフト仕分け',
      ui: {
        signBrand: '星潮科技',
        signSub: 'XINGCHAO TECH · ADMIN',
        returnLabel: '返却',
        returnSub: 'RETURN',
        calRenew: '更新まで',
        calDays: '21日',
        hrTag: 'HR部長',
        brandMini: '星潮科技 · 事務部',
        unit: '個',
        penaltyTitle: '仕分け停止',
        penaltyResume: '秒後に再開',
        gift: 'ギフト',
        kicker: '星潮科技 · 事務部 · 臨時席',
        oss: '非商用OSS · スポンサー / 誘導 / 収益 なし',
        h1: '仲間',
        sub: '年末ギフト仕分け',
        lede: '60秒で、社員証の一番下にある「契約主体」を見て年末ギフトを仕分けよう。正解数に上限はなし。顔写真、ストラップの色、カードホルダー、役職は判断材料にならない。',
        ruleLeft: '左へ配布',
        ruleLeftBody: '星潮科技 + 曜辰 / 瀚海 / 赤曜 / 青梧 <i>・正社員 / インターン / 提携先</i>',
        ruleRight: '右へ返却',
        ruleRightBody: 'その他の契約主体 <i>・関連会社 / 外部委託 / サービス事業者</i>',
        rulePause: 'ミスで停止',
        rulePauseBody: '仕分けが4秒停止し、カウント終了後に再開。社員証を左右にドラッグして操作。',
        keyHint: '<kbd>←</kbd> 左へ配布 · <kbd>→</kbd> 右へ返却（キーボード対応）',
        nameLabel: '社員証の名前',
        namePlaceholder: '臨時スタッフ',
        zenBtn: '自分用に1箱',
        startBtn: '仕分け開始',
        rankBtn: 'ランキング',
        foot: '<b>非商用のオープンソース作品。スポンサー・誘導・収益なし。</b><br>会社、人物、社員証はすべてフィクション。ランキングはローカルのデモデータで、実在のユーザー情報は含みません。',
        ruleStamp: '唯一の根拠<br>契約主体',
        rankTitle: 'ランキング',
        demoTag: 'デモデータ',
        tabDay: '今日',
        tabAll: '累計',
        rankNote: 'デモボード：ローカルデータ + 固定ライバル',
        posterTitle: 'シェアポスター',
        savePng: '画像を保存',
        copyTx: '文章をコピー'
      },

      badges: {
        xc: { entity: '星潮科技有限公司', brand: '星潮科技', en: 'XINGCHAO TECH', strip: '星潮科技 · XINGCHAO TECH · ' },
        hz: { entity: '星潮クラウド（杭州）有限公司', brand: '星潮科技', en: 'XINGCHAO TECH', strip: '星潮クラウド · XINGCHAO CLOUD · ' },
        lh: { entity: '蓝海人力資源サービス有限公司', brand: '星潮科技', en: 'XINGCHAO TECH', strip: '蓝海人力 · LANHAI HR · ' },
        zy: { entity: '智雲企業サービス有限公司', brand: '智雲サービス', en: 'ZHIYUN SERVICE', strip: '智雲サービス · ZHIYUN SERVICE · ' },
        yc: { entity: '曜辰インタラクティブ科技有限公司', brand: '曜辰科技', en: 'YAOCHEN TECH', strip: '曜辰科技 · YAOCHEN TECH · ' },
        hh: { entity: '瀚海クラウド科技有限公司', brand: '瀚海科技', en: 'HANHAI CLOUD', strip: '瀚海科技 · HANHAI CLOUD · ' },
        cy: { entity: '赤曜インタラクティブ・エンタメ有限公司', brand: '赤曜インタラクティブ', en: 'CHIYAO INTERACTIVE', strip: '赤曜インタラクティブ · CHIYAO INTERACTIVE · ' },
        qw: { entity: '青梧データ科技有限公司', brand: '青梧データ', en: 'QINGWU DATA', strip: '青梧データ · QINGWU DATA · ' }
      },

      names: [
        ['佐藤 美咲', 'sato.misaki'], ['鈴木 翔太', 'suzuki.shota'], ['高橋 陽菜', 'takahashi.hina'], ['田中 蓮', 'tanaka.ren'],
        ['伊藤 結衣', 'ito.yui'], ['渡辺 海斗', 'watanabe.kaito'], ['山本 芽依', 'yamamoto.mei'], ['中村 大輝', 'nakamura.daiki'],
        ['小林 さくら', 'kobayashi.sakura'], ['加藤 悠真', 'kato.yuma'], ['吉田 葵', 'yoshida.aoi'], ['松本 拓海', 'matsumoto.takumi'],
        ['井上 奈緒', 'inoue.nao'], ['木村 颯', 'kimura.hayate'], ['林 花音', 'hayashi.kanon'], ['斎藤 涼', 'saito.ryo'],
        ['清水 美月', 'shimizu.mizuki'], ['山崎 大和', 'yamazaki.yamato'], ['森 千尋', 'mori.chihiro'], ['池田 健人', 'ikeda.kento']
      ],

      roles: {
        ft: [['P7 シニアエンジニア', '基盤開発部'], ['P6 プロダクトマネージャー', 'プロダクト部'], ['P6 ブランドマネージャー', 'マーケティング部'], ['P5 財務担当', '財務部'], ['P6 ビジュアルデザイナー', 'デザインセンター'], ['P7 データアナリスト', 'データ基盤部']],
        intern: [['インターン生', '基盤開発部'], ['インターン生', 'プロダクト部'], ['インターン生', 'マーケティング部'], ['インターン生', 'デザインセンター']],
        ins: [['P7 シニアエンジニア', '基盤開発部'], ['P6 プロダクトマネージャー', 'プロダクト部'], ['P6 データアナリスト', 'データ基盤部'], ['P5 運営担当', 'グロース運営部']],
        out: [['事務担当（常駐）', '事務サポート部'], ['カスタマーサポート（常駐）', 'サポートセンター'], ['コンテンツ審査（常駐）', 'コンテンツ審査部'], ['ITサポート（常駐）', 'IT運用部']],
        sp: [['清掃員', '清掃サービス'], ['警備員', '警備サービス'], ['修理担当', '設備サービス'], ['受付', '事務サービス']],
        pt: [['P8 シニアエンジニア', '基盤開発部'], ['P7 プロダクトマネージャー', 'プロダクト部'], ['P7 データアナリスト', 'データ基盤部'], ['P6 ビジュアルデザイナー', 'デザインセンター'], ['P6 運営マネージャー', 'グロース運営部']]
      },

      titles: ['仮採用', '外部委託事務', '関連会社事務', '事務スペシャリスト', '福利厚生担当', 'ギフト管理人', '受領書の神', 'コスト管理の鬼', 'HRBP', '事務部長', '労組委員長'],

      drill: [
        '正社員：契約主体「星潮科技有限公司」→ 左へ配布',
        'インターンも星潮科技との契約 → 左へ配布',
        '提携先にもギフト：ブランドと契約主体を確認 → 左へ配布',
        '蓝海人力は取引先 → 右へ返却',
        '関連会社の契約主体は「星潮クラウド（杭州）」→ 右へ返却',
        'サービス事業者「智雲企業サービス」→ 右へ返却'
      ],

      why: {
        prefix: '不正解。',
        out: '蓝海人力は星潮科技ではない',
        ins: '関連会社の契約は星潮クラウド',
        sp: '智雲はサービス事業者で、仲間ではない',
        pt: '提携先にもギフトあり。左へ',
        def: '星潮科技との契約。左へ'
      },

      hrWho: 'HR部長',
      finishDlg: {
        line1: 'ギフトは全部配った？',
        line2: 'この数箱、誰に配ったの？',
        lastBad: '数が合わないわ。どこの会社の人？',
        lastGood: '数が合ってるわ。お疲れ様。',
        lastOk: '数が合ってるわ。'
      },
      zenDlg: { line1: 'この箱、外部委託の人用？', line2: '外部委託にはないわ。' },

      badge: {
        staffTag: '社員 / STAFF',
        entityLabel: '契約主体',
        staffId: '社員証 · STAFF ID',
        defaultName: '臨時スタッフ',
        backBrand: '星潮科技',
        backSub: 'STAFF'
      },

      result: {
        zenTitle: '解除',
        stampZero: '無事故',
        stampPass: '合格',
        stampReview: '要確認',
        quoteZen: '外部委託にはないわ。',
        quoteZero: '数が合ってるわ。',
        quoteFast: '仕分けは早いけど、数箱合わないわ。',
        quoteElse: 'まず聞くわ、この受領書にサインしたのは誰？',
        scoreUnit: '個',
        cherryUnit: '箱チェリー',
        kickerZen: '年末棚卸し · 特別エンディング',
        kickerNormal: '本日の精算 · 事務部',
        msgZen: 'そのチェリー、もう家に運んだわね。',
        msgNormal: '社員証の文字は、思ったより多いのよ。',
        rTaken: '持ち出したギフト',
        rRenewal: '更新資格',
        rVerdict: 'HR部長の評価',
        rCorrect: '正解',
        rWrongSent: '誤って配布',
        rWrongReturned: '誤って返却',
        rBest: '自己ベスト',
        renewRevoked: '解除済み',
        btnAgain: 'もう一度',
        btnRank: 'ランキング',
        btnPoster: 'シェアポスター',
        btnHome: 'ホーム',
        bestLine: '自己ベスト {n}{unit} · {title}',
        bestLineSuffix: ' · デモボードに実ユーザーなし'
      },

      rank: {
        me: 'あなた',
        err: 'ミス {m}',
        empty: 'まだ誰も配達していません',
        zenRow: 'チェリー1箱で更新資格を失った人 {n} 人',
        note: 'デモボード：自己ベスト + 固定ライバル、実ユーザーデータなし。',
        botsDay: [
          { n: '残業したくないメイ', s: 48, m: 0 }, { n: '事務部の王くん', s: 46, m: 1 }, { n: '外部委託だって人だ', s: 44, m: 0 },
          { n: 'ギフト運び屋', s: 43, m: 2 }, { n: '蓝海常駐の張さん', s: 41, m: 1 }, { n: 'チェリー目当て', s: 39, m: 0 },
          { n: '関連会社は仲間じゃない', s: 37, m: 2 }, { n: 'ビル管理の陳さん', s: 36, m: 1 }, { n: 'HR部長本人', s: 35, m: 0 }
        ],
        botsAll: [
          { n: '受領書の神', s: 59, m: 0 }, { n: '労組委員長', s: 57, m: 1 }, { n: '年末ノルマ', s: 56, m: 0 },
          { n: '表計算の戦士', s: 54, m: 3 }, { n: '蓝海の古株', s: 52, m: 1 }, { n: '正社員になれた', s: 50, m: 0 },
          { n: '事務部長', s: 49, m: 2 }, { n: '残業拒否', s: 47, m: 0 }, { n: 'チェリー自由', s: 45, m: 1 },
          { n: 'インターンの周ちゃん', s: 43, m: 0 }
        ]
      },

      poster: {
        pBrand: '星 潮 科 技 ・ 事 務 部',
        pH1: '仲間',
        pSub: '年末ギフト仕分け',
        pQuoteZen: '「外部委託にはないわ。」',
        pQuoteOk: '「数が合ってるわ。」',
        pZenLine: '特別エンディング · チェリー1箱を持ち出し',
        pCorrectLine: '今回の正解数',
        pUnitBox: '箱',
        pUnitFen: '個',
        pErrLine: '誤配布 {a}個 · 誤返却 {b}個',
        pScan: 'スキャンしてギフト仕分け',
        pAlt: '『仲間』· 年末ギフト仕分け',
        pDisclaimer: '登場する会社・人物・社員証はフィクション。ランキングはローカルデモデータ。',
        pTitle2: '『仲間』',
        pCredit: 'イラスト素材：いらすとや',
        pbBrand: '星潮科技',
        pbBrandEn: 'X I N G C H A O   T E C H',
        pbStaff: '社員 / STAFF',
        pbRole: '事務担当（常駐） · 事務サポート部',
        pbId: 'ID OD-8827',
        pbMail: 'admin.temp@lanhai-hr.com',
        pbEntityLabel: '契 約 主 体',
        pbEntity: '蓝海人力資源サービス有限公司',
        pbStaffId: 'STAFF ID · 社員証'
      },

      misc: {
        copied: 'コピーしました',
        copyFail: 'コピー失敗。手動で選択を',
        saveFail: 'このブラウザは保存非対応。画像を長押し',
        filePrefix: '仲間',
        shareText: '『仲間』でギフトを{n}個仕分け、称号「{t}」を獲得。誤配布{a}個、誤返却{b}個。あなたも仲間を見分けられるか挑戦。'
      }
    }
  };

  /* 模板插值：zf('共 {n} 个', {n: 3}) */
  function zf(tpl, o) {
    return String(tpl).replace(/\{(\w+)\}/g, function (m, k) {
      return o[k] != null ? o[k] : m;
    });
  }

  /* 初始语言：localStorage 优先，其次浏览器语言 */
  function detectLang() {
    try {
      const saved = localStorage.getItem('zj_lang');
      if (saved && I18N[saved]) return saved;
      const n = (navigator.language || 'en').toLowerCase();
      if (n.indexOf('zh') === 0) return 'zh';
      if (n.indexOf('ja') === 0) return 'ja';
      return 'en';
    } catch (e) {
      return 'en';
    }
  }

  window.I18N = I18N;
  window.zf = zf;
  window.detectLang = detectLang;
})();
