
//I did not completely finish, I ran out of time on part 6. 

const fastify = require("fastify")();

let students = [
  {
    id: 1,
    last: "Smith",
    first: "Connor",
  },
  {
    id: 2,
    last: "Jacobs",
    first: "Alex",
  },
  {
    id: 3,
    last: "Bailey",
    first: "Michael",
  },
];


const generateNextId = () => {
    let numberOfStudents = students.length;
    let nextId = numberOfStudents + 1;
    return nextId;
};

function appendsToStudent(newStudent) {
    let nextId = null;

    const { id = nextId, last = "", first = ""} = newStudent;
    students.push({id, last, first});

    console.log(students);
    return updatedStudentArray;
}

function getStudentById(id) {
    let idInInteger = parseInt(id);
    for (let student of students) {
        if (student.id === idInInteger) {
            return student.first+" "+student.last
        }
    }
};

fastify.get("/cit/student", function (request, reply) {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8") 
      .send({
        students: students[0].first+" "+students[0].last+", "+
                  students[1].first+" "+students[1].last+", "+
                  students[2].first+" "+students[2].last,
        statusCode: 200,
      }); 
});

fastify.post("/cit/student", function (request, reply) {
    // home route
    const newStudent = request.body; // {first: "", last: ""}
    const updatedStudentArray = appendsToStudent(newStudent);
    reply
      .code(200) // status code
      .header("Content-Type", "application/json; charset=utf-8") // mime type for arrays and jsons
      .send([updatedStudentArray]); // we need to send back the updated student arry
  });


fastify.get("/cit/student/:id", function (request, reply) {
    const { id } = request.params;
    const idInt = parseInt(id);

    for (let student of students) {
        if (idInt === student.id) {
            reply.code(200)
            reply.header("Content-Type", "application/json; charset=utf-8")
            reply.send({
                student: getStudentById(idInt),
                statusCode: 200
                });
            return
        }
        
    }
            reply.code(404);
            reply.header("Content-Type", "application/json; charset=utf-8");
            reply.send({
                student: "Not Found",
                statusCode: 404,
                })
});


fastify.get("/cit/*", (request, reply) => {
    reply
      .code(404)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ error: "Route not found",
              statusCode: 404,
        });
});


const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

