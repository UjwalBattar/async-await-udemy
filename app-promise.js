const users = [{
    id: 1,
    name: 'Andrew',
    schoolId: 101
}, {
    id: 2,
    name: 'Jessica',
    schoolId: 999
}];

const grades = [{
    id: 1,
    schoolId: 101,
    grade: 86
}, {
    id: 2,
    schoolId: 999,
    grade: 100
}, {
    id: 3,
    schoolId: 101,
    grade: 80
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => {
            return user.id === id;
        });

        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}.`);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => {
            return grade.schoolId === schoolId;
        }));
    });
};

// get averages of grades based on UserId
const getStatus = (userId) => {
    let user;
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        let average = 0;

        if (grades.length) {
            average = grades.map((grade) => grade.grade)
                .reduce((a, b) => {
                    return a + b;
                }) / grades.length;
        }
        return `${user.name} has an average of ${average}%.`;

    });
};

getStatus(1).then((status) => {
    console.log(status);
}).catch((e) => {
    console.log(e);
});

getUser(2).then((user) => {
    console.log(user);
}).catch((e) => {
    console.log(e);
});

getGrades(999).then((grades) => {
    console.log(grades);
}).catch((e) => {
    console.log(e);
});