# npn run start:profilling
artillery quick --count 50 -n 20 "http://localhost:8080/info" > result1.txt

#Una vez que se haya ejecutado el script. tomar el nombre del archivo isolate y ejecutar
# node --prof-process PROF2.log > PROF2.txt