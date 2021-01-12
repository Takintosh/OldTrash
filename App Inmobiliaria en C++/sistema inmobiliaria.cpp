#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct fecha
{
    int dia;
    int mes;
    int anio;
};

struct inmueble
{
    char valido;
    char modelo[10];
    char tipo[1];
    char estado[1];
    char nombre[34];
    char domicilio[20];
    long durac_cont;
    long ci;
    float valor_a;
    float valor_t;
    float deuda;
    struct fecha fecha_alq;
    struct fecha fecha_ult_p;
};

int Menu();
int main();
int nro_cont;

void Leer(struct inmueble *inm);
void Mostrar(struct inmueble *inm);
void Modificar(struct inmueble *inm);
void Listar(long n, struct inmueble *inm);
void Alquilar(struct inmueble *inm);
void Devolucion(struct inmueble *inm);
void Pago(struct inmueble *inm);
long LeeNumero();
void Empaquetar(FILE **fa);

int main()
{
    struct inmueble inm;
    FILE *fa;
    int opcion;
    long numero;
    fa = fopen("inmobiliaria.dat", "r+b");
    if (!fa)
        fa = fopen("inmobiliaria.dat", "w+b");
    do
    {
        opcion = Menu();
        switch (opcion)
        {
        case 1:
            Leer(&inm);
            fseek(fa, 0, SEEK_END);
            fwrite(&inm, sizeof(struct inmueble), 1, fa);
            Mostrar(&inm);
            system("pause");
            break;
        case 2:
            system("cls");
            printf("Modificar los datos de un Inmueble:\n");
            printf("Ingrese el codigo del inmueble a modificar: ");
            numero = LeeNumero() - 1;
            fseek(fa, numero * sizeof(struct inmueble), SEEK_SET);
            fread(&inm, sizeof(struct inmueble), 1, fa);
            Mostrar(&inm);
            Modificar(&inm);
            fseek(fa, numero * sizeof(struct inmueble), SEEK_SET);
            fwrite(&inm, sizeof(struct inmueble), 1, fa);
            break;
        case 3:
            system("cls");
            printf("Baja de un Inmueble: \n");
            printf("Ingrese el codigo del inmueble a dar de baja: ");
            numero = LeeNumero() - 1;
            fseek(fa, numero * sizeof(struct inmueble), SEEK_SET);
            fread(&inm, sizeof(struct inmueble), 1, fa);
            inm.valido = 'n';
            fseek(fa, numero * sizeof(struct inmueble), SEEK_SET);
            fwrite(&inm, sizeof(struct inmueble), 1, fa);
            break;
        case 4:
            system("cls");
            printf("Consulta de un Inmueble: \n");
            printf("Ingrese el codigo del inmueble a consultar: ");
            numero = LeeNumero() - 1;
            fseek(fa, numero * sizeof(struct inmueble), SEEK_SET);
            fread(&inm, sizeof(struct inmueble), 1, fa);
            Mostrar(&inm);
            system("pause");
            break;
        case 5:
            rewind(fa);
            numero = 1;
            system("cls");
            printf("Consulta de todos los inmuebles:\n");
            printf("Codigo   Modelo   tipo  estad      domicilio         valor_mes  val_total durac\n");
            while (fread(&inm, sizeof(struct inmueble), 1, fa))
                Listar(numero++, &inm);
            system("pause");
            break;
        case 6:
            system("cls");
            printf("Alquiler de un Inmueble: \n");
            printf("Ingrese el codigo del inmueble a alquilar: ");
            numero = LeeNumero() - 1;
            fseek(fa, numero * sizeof(struct inmueble), SEEK_SET);
            fread(&inm, sizeof(struct inmueble), 1, fa);
            Mostrar(&inm);
            Alquilar(&inm);
            fseek(fa, numero * sizeof(struct inmueble), SEEK_SET);
            fwrite(&inm, sizeof(struct inmueble), 1, fa);
            break;
        case 7:
            system("cls");
            printf("Devolucion de un Inmueble: \n");
            printf("Ingrese el codigo del inmueble a devolver: ");
            numero = LeeNumero() - 1;
            fseek(fa, numero * sizeof(struct inmueble), SEEK_SET);
            fread(&inm, sizeof(struct inmueble), 1, fa);
            Mostrar(&inm);
            Devolucion(&inm);
            fseek(fa, numero * sizeof(struct inmueble), SEEK_SET);
            fwrite(&inm, sizeof(struct inmueble), 1, fa);
            break;
        case 8:
            system("cls");
            printf("Pago de Alquiler: \n");
            printf("Ingrese el codigo del inmueble a pagar el alquiler: ");
            numero = LeeNumero() - 1;
            fseek(fa, numero * sizeof(struct inmueble), SEEK_SET);
            fread(&inm, sizeof(struct inmueble), 1, fa);
            Mostrar(&inm);
            Pago(&inm);
            fseek(fa, numero * sizeof(struct inmueble), SEEK_SET);
            fwrite(&inm, sizeof(struct inmueble), 1, fa);
            break;
        case 9:
            Empaquetar(&fa);
            printf("\n Los registros fueron eliminados satisfactoriamente \n\n");
            system("pause");
            break;
        }
    } while (opcion != 0);
    fclose(fa);
    return 0;
}

int Menu()
{
    int resp;
    do
    {
        system("cls");
        printf("                           Sistema Inmobiliaria v 1.0 \n");
        printf("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- \n");
        printf(" 1-Ingreso de un Inmueble \n");
        printf(" 2-Modificar los datos de un Inmueble \n");
        printf(" 3-Baja de un Inmueble \n");
        printf(" 4-Consulta de un Inmueble \n");
        printf(" 5-Consulta de todos los Inmuebles \n");
        printf(" 6-Alquiler de un Inmueble \n");
        printf(" 7-Devolucion de un Inmueble (si no tiene deuda) \n");
        printf(" 8-Pago de Alquiler \n");
        printf(" 9-Eliminacion de los registros marcados \n");
        printf(" 0-Fin \n");
        printf("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- \n");
        printf(" Ingrese su opcion: \n");
        printf("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- \n");
        scanf("%d", &resp);
    } while (resp < 0 || resp > 9);
    return resp;
}

void Leer(struct inmueble *inm)
{
    system("cls");
    printf("Anadir un Inmueble: \n");
    inm->valido = 's';
    printf("\n Modelo (casa/apto/comercial): ");
    scanf("%s", inm->modelo);
    printf("\n Tipo (a-alquiler/v-venta): ");
    scanf("%s", inm->tipo);
    printf("\n Domicilio: ");
    scanf("%s", inm->domicilio);
    printf("\n Valor de la cuota: ");
    scanf("%f", &inm->valor_a);
    printf("\n Duracion del contrato (en meses): ");
    scanf("%ld", &inm->durac_cont);
    nro_cont = 0;
    strcpy(inm->estado, "l");
    strcpy(inm->nombre, " ");
    inm->ci = 0;
    inm->fecha_alq.dia = 0;
    inm->fecha_alq.mes = 0;
    inm->fecha_alq.anio = 0;
    inm->fecha_ult_p.dia = 0;
    inm->fecha_ult_p.mes = 0;
    inm->fecha_ult_p.anio = 0;
    inm->valor_t = inm->valor_a * inm->durac_cont;
    inm->deuda = inm->valor_t;
}

void Modificar(struct inmueble *inm)
{
    int resp;
    printf("Modificar Inmueble: \n");
    printf("Desea modificar los datos del Inmueble (0-NO/1-SI)? ");
    scanf("%d", &resp);
    system("cls");
    if (resp == 1)
    {
        if (inm->valido == 's')
        {
            printf("\n Ingrese el nuevo Modelo (casa/apto/comercial): ");
            scanf("%s", inm->modelo);
            printf("\n Ingrese el nuevo Domicilio: ");
            scanf("%s", inm->domicilio);
            printf("\n Ingrese el nuevo Tipo (a-alquiler/v-venta): ");
            scanf("%s", inm->tipo);
            printf("\n Ingrese el nuevo Estado (a-alquilada/l-libre): ");
            scanf("%s", inm->estado);
            printf("\n Ingrese el nuevo Valor de la cuota: ");
            scanf("%f", &inm->valor_a);
            printf("\n Ingrese la nueva Duracion del contrato: ");
            scanf("%ld", &inm->durac_cont);
            inm->valor_t = inm->valor_a * inm->durac_cont;
            printf("\n Valor total del contrato: %.2f \n", inm->valor_t);
            printf("\n Ingrese la nueva deuda: ");
            scanf("%f", &inm->deuda);
            printf("\n Ingrese nuevo Numero de contrato: ");
            scanf("%d", nro_cont);
            printf("\n Ingrese nuevo Nombre de inquilino: ");
            scanf("%s", inm->nombre);
            printf("\n Ingrese nueva C.I. del inquilino: ");
            scanf("%8ld", &inm->ci);
            printf("\n Ingrese nueva Fecha de Alquiler (dd mm aa): ");
            scanf("%d %d %d", &inm->fecha_alq.dia, &inm->fecha_alq.mes, &inm->fecha_alq.anio);
            printf("\n Ingrese nueva Fecha de Ultimo Pago (dd mm aa): ");
            scanf("%d %d %d", &inm->fecha_ult_p.dia, &inm->fecha_ult_p.mes, &inm->fecha_ult_p.anio);
        }
    }
}

void Mostrar(struct inmueble *inm)
{
    system("cls");
    if (inm->valido == 's')
    {
        printf("Modelo: %s \n", inm->modelo);
        printf("Domicilio: %s \n", inm->domicilio);
        printf("Tipo: %.1s \n", inm->tipo);
        printf("Estado: %.1s \n", inm->estado);
        printf("Valor del Alquiler: %.2f \n", inm->valor_a);
        printf("Duracion del contrato: %ld \n", inm->durac_cont);
        printf("Valor Total del Contrato: %.2f \n", inm->valor_t);
        printf("Numero de Contrato: %d\n", nro_cont);
        printf("Nombre del inqilino: %s \n", inm->nombre);
        printf("Cedula de Identidad del inquilino: %ld \n", inm->ci);
        printf("Falta a pagar: %.2f\n", inm->deuda);
        printf("Fecha de Alquiler: %d/%d/%d/\n", inm->fecha_alq.dia, inm->fecha_alq.mes, inm->fecha_alq.anio);
        printf("Fecha del Ultimo Pago: %d/%d/%d\n", inm->fecha_ult_p.dia, inm->fecha_ult_p.mes, inm->fecha_ult_p.anio);
    }
}

void Listar(long n, struct inmueble *inm)
{
    if (inm->valido == 's')
    {
        printf("[%5ld] %9s   %.1s    %.1s  %20s      %5.2f    %8.2f   %3ld\n",
               n, inm->modelo, inm->tipo, inm->estado, inm->domicilio, inm->valor_a, inm->valor_t, inm->durac_cont);
    }
}

void Alquilar(struct inmueble *inm)
{
    if (inm->valido == 's')
    {
        strcpy(inm->estado, "a");
        nro_cont = nro_cont + 1;
        printf("\n Ingrese el Nombre del nuevo inqulino: ");
        scanf("%s", inm->nombre);
        printf("\n Ingrese la C.I. del nuevo inquilino: ");
        scanf("%8ld", &inm->ci);
        printf("\n Ingrese la Fecha de hoy (dd mm aa): ");
        scanf("%d %d %d", &inm->fecha_alq.dia, &inm->fecha_alq.mes, &inm->fecha_alq.anio);
    }
}

void Devolucion(struct inmueble *inm)
{
    if (inm->valido == 's')
    {
        if (inm->deuda == 0)
        {
            nro_cont == 0;
            strcpy(inm->nombre, " ");
            inm->ci == 0;
            strcpy(inm->estado, "l");
            inm->fecha_alq.dia = 0;
            inm->fecha_alq.mes = 0;
            inm->fecha_alq.anio = 0;
            inm->fecha_ult_p.dia = 0;
            inm->fecha_ult_p.mes = 0;
            inm->fecha_ult_p.anio = 0;
            inm->deuda = inm->valor_t;
        }
    }
}

void Pago(struct inmueble *inm)
{
    if (inm->valido == 's')
    {
        if (inm->deuda != 0)
        {
            inm->deuda = inm->deuda - inm->valor_a;
            printf("Ingrese la fecha de hoy (dd mm aa): ");
            scanf("%d %d %d", &inm->fecha_ult_p.dia, &inm->fecha_ult_p.mes, &inm->fecha_ult_p.anio);
        }
    }
}

long LeeNumero()
{
    long numero;
    scanf("%ld", &numero);
    return numero;
}

void Empaquetar(FILE **fa)
{
    FILE *ftemp;
    struct inmueble inm;
    ftemp = fopen("inmobiliaria.tmp", "wb");
    rewind(*fa);
    while (fread(&inm, sizeof(struct inmueble), 1, *fa))
        if (inm.valido == 's')
            fwrite(&inm, sizeof(struct inmueble), 1, ftemp);
    fclose(ftemp);
    fclose(*fa);
    remove("inmobiliaria.bak");
    rename("inmobiliaria.dat", "inmobiliaria.bak");
    rename("inmobiliaria.tmp", "inmobiliaria.dat");
    *fa = fopen("inmobiliaria.dat", "r+b");
}