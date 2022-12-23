/*
1) Nest js can`t resolme tte Controller. 
  ошибка связаны была с путем файла. Я импортироали все из index.ts, но так получается, 
  что все файлы импортируются из индекса (controller, service, module) и внутри них нужно использовать путь в импорте 
  именно до самого файла, а не брать его с индекса, а при импорте в другие директории уже можно брать с index.ts

2) Cannot find module 'C:\Users\retmo\OneDrive\Рабочий стол\musucal-platform\server\dist\app.module' imported from C:\Users\retmo\OneDrive\Рабочий стол\musucal-platform\server\dist\main.js
3) Постоянный статус pending был из-за того, что когда есть декораток у роута @Res() нужно самостоятельно формировать запрос через res.status(XXX).send(YYY)
*/
