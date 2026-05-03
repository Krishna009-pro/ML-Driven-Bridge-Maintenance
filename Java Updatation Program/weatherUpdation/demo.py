a = "int,String,double,double,float,float,float,float,float,float,float,float,float,String,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,int,float,int,String,String,float,int,float,float,int,float,float,float,int,int,int,int,int,int,int,int,float"
a= a.split(",")
print(a);
b = "int,String,double,double,float,float,float,float,float,float,float,float,float,String,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,float,int,float,int,String,String,float,int,float,float,int,float,float,float,int,int,int,float,float,float,int,int,float"
b = b.split(",");

for i in range (1 , len(a)) :
    if a[i]== b[i]:
        continue
    else:
        print("\n ",i)

