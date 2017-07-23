let dirname = __dirname;
module.exports = {
    main: require(`${dirname}/main`).mainPage,
    feedback: require(`${dirname}/main`).feedbackPage,
    search: {
        report: require(`${dirname}/search`).searchReportPage,
        company: require(`${dirname}/search`).searchCompanyPage
    },
    stats: require(`${dirname}/stats`).statsPage,
    register: {
        report: require(`${dirname}/report`).registerReportPage,
        company: require(`${dirname}/company`).registerCompanyPage
    },
    admin: {
        login: require(`${dirname}/admin`).adminLogin,
        logout: require(`${dirname}/admin`).adminLogout,
        page: require(`${dirname}/admin`).adminPage
    },
    company: {
        create: require(`${dirname}/company`).addCompany,
        validate: require(`${dirname}/company`).validateCompany,
        getById: require(`${dirname}/company`).getCompanyById
    },
    report: {
        create: require(`${dirname}/report`).addReport,
        validate: require(`${dirname}/report`).validateReport,
        getById: require(`${dirname}/report`).getReportById
    },
    sendEmail: require(`${dirname}/email`).sendEmail,
    getFile: require(`${dirname}/db-files`).getFile,
    addNews: require(`../models/newsModel`).addNews,
    API: {
        search: {
            company: require(`${dirname}/search`).searchCompanyPageREST,
            report: require(`${dirname}/search`).searchReportPageREST
        },
        stats: require(`${dirname}/stats`).getStats,
        static: require(`../models/staticModel`).staticREST
    }
};