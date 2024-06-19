import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

class AnaliseProfunda:
    """
    Classe para distribuir as funções de análise de dados.
    """

    def __init__(self):
        self.df = pd.read_excel('back/API/dados/coletaDeDados.xlsx') # Alterar quando passar para a WEB

    def acessosPorDispositivo(self):
        """
        Mostra o gráfico de acessos por dispositivo.
        """
        plt.title('Acessos por dispositivo')

        computador = self.df['Computador'].sum()
        mobile = self.df['Dispositivo móvel'].sum()
        tablet = self.df['Tablet'].sum()

        eixo_x = ['Computador', 'Celular', 'Tablet']
        eixo_y = [computador, mobile, tablet]

        plt.xlabel('Dispositivos')
        plt.ylabel('Quantidade de acessos')
        sns.barplot(x=eixo_x, y=eixo_y)
        
        plt.show()
    
    def acessosPorSistemaOperacional(self):
        """
        Mostra o gráfico de acessos por dispositivo.
        """
        plt.title('Acessos por sistema operacional')

        dispositivos = self.df['Sistema Operacional'].value_counts().sort_index().keys()
        dispositivos_valores = self.df['Sistema Operacional'].value_counts().sort_index().values

        eixo_x = dispositivos
        eixo_y = dispositivos_valores

        plt.bar(eixo_x, eixo_y)

        plt.xlabel('Sistema Operacional')
        plt.ylabel('Quantidade de acessos')
        plt.tight_layout()

        plt.show()

    def idiomasFalados(self):
        """
        Mostra o gráfico das linguagens mais faladas.
        """
        plt.title('Linguagens mais usadas')

        idiomas = self.df['Idioma de fala'].value_counts().sort_index().keys()
        idiomas_valores = self.df['Idioma de fala'].value_counts().sort_index().values
        
        eixo_x = idiomas
        eixo_y = idiomas_valores

        plt.bar(eixo_x, eixo_y)

        plt.xlabel('Idioma')
        plt.ylabel('Quantidade de acessos')
        plt.xticks(rotation=70)
        plt.tight_layout()

        plt.show()
    
    def idiomasTraduzidos(self):
        """
        Mostra o fráfico das linguagens mais traduzidas.
        """

        plt.title('Linguagens mais traduzidas')

        idiomas = self.df['Idioma de Tradução'].value_counts().sort_index().keys()
        idiomas_valores = self.df['Idioma de Tradução'].value_counts().sort_index().values

        eixo_x = idiomas
        eixo_y = idiomas_valores

        plt.bar(eixo_x, eixo_y)

        plt.xlabel('Idioma')
        plt.ylabel('Quantidade de acessos')
        plt.xticks(rotation=70)
        plt.tight_layout()

        plt.show()

    def picosDeAcesso(self):
        """
        Mostra os picos de acesso por data.
        """
        plt.title('Picos de acesso')

        self.df['Horário acessado'] = pd.to_datetime(self.df['Horário acessado'])
        self.df['Data'] = self.df['Horário acessado'].dt.date

        acessos_por_dia = self.df['Data'].value_counts().sort_index()
        eixo_x = acessos_por_dia.keys()
        eixo_y = acessos_por_dia.values

        plt.plot(eixo_x, eixo_y)

        plt.xlabel('Data')
        plt.ylabel('Quantidade de acessos')
        plt.xticks(rotation=70)
        plt.tight_layout()

        plt.show()

instancia = AnaliseProfunda()
instancia.acessosPorSistemaOperacional()