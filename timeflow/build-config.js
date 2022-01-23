const path = require('path');
const infiniteCanvasWebpackConfig = require('../infinite-canvas-webpack-config');

module.exports = function(destination, excludeInfiniteCanvas){
    const fullDestination = path.resolve(destination);
    const parallel = [
        {
            type: 'copyFiles',
            source: __dirname,
            destination: destination,
            fileNames: ['index.html', 'style.css']
        },
        {
            type: 'copyFiles',
            source: __dirname+"/data",
            destination: destination,
            fileNames: ['timeflow-records.json']
        },
        {
            type: 'copyFiles',
            source: __dirname + "/imgs/pt-presidents",
            destination: destination,
            fileNames: [ "José_Mendes_Cabeçadas_Junior.png","143px-Carmona.jpg","144px-João_de_Canto_e_Castro_da_Silva_Antunes_(Arquivo_Histórico_Parlamentar).png","318px-João_do_Canto_e_Castro_-_Ilustração_Portuguesa_23DEZ1918.png","AmericoThomaz.png","António_José_de_Almeida,_1919.png","António_Ramalho_Eanes.png","António_de_Spínola_(1974).png","Aníbal_Cavaco_Silva_(cropped).jpg","BernardinoMachado.png","Cavaco_Silva_(2014-06-05),_cropped.png","Fotografia_oficial_do_Presidente_Jorge_Sampaio.jpg","Francisco_Higino_Craveiro_Lopes.jpg","Francisco_da_Costa_Gomes.gif","Gomes_da_costa.jpg","Manuel_Teixeira_Gomes.png","Manuel_de_Arriaga_-_Fotografia_Vasques.png","Marcelo_Rebelo_de_Sousa_em_fevereiro_de_2018.jpg","Mário_Soares.png","Sidónio_Pais,_phot._Bobone.png","Teófilo_Braga_-_Ilustração_Portugueza_(7JUN1915).png" ]
        },
        {
            type: 'copyFiles',
            source: __dirname + "/imgs/pt-kings",
            destination: destination,
            fileNames: [ "140px-AfonsoII.jpg","140px-Afonso_III.jpg","140px-Afonso_I_Henriques.jpg","140px-Cardeal_D._Henrique,_cópia_de_original_de_c._1590.jpg","140px-D._Afonso_IV_(1718)_-_Henrique_Ferreira.png","140px-D._Dinis_(Quinta_da_Regaleira).png","140px-D._Pedro_I_de_Portugal.png","140px-D._Sancho_I.jpg","140px-D._Sancho_II_(1718)_-_Henrique_Ferreira.png","140px-D._Teresa_de_Portugal,_Condessa_da_Flandres_-_The_Portuguese_Genealogy_(Genealogia_dos_Reis_de_Portugal).png","140px-D_Luis.jpg","140px-Don_Pedro_V.jpg","140px-DpedroI-brasil-full.jpg","140px-Leonore_Teles_de_Menezes.jpg","140px-Manuel_I.jpg","140px-Miguel_-_João_Baptista_Ribeiro_(1790_-_1868).jpg","140px-Peter_of_Coimbra_(St._Vincent_Panels).jpg","140px-Portrait_of_King_Fernando_I,_Belem_Collection.JPG","140px-Portrait_of_King_John_IV_(1643)_-_José_de_Avelar_Rebelo.png","140px-Raymond_of_Burgundy._Count_of_Galiza.png","140px-UrracaRegina_TumboA.jpg","165px-Brasão_do_Reino_de_Portugal.png","200px-Coat_of_Arms_of_D._Henry_of_Burgundy,_Count_of_Portugal.png","214px-Philip_II.jpg","220px-Bandeira_D._João_V_de_Portugal.png","250px-Full_Ornamented_Coat_of_Arms_of_Spanish_House_of_Austria_(1580-1668).svg.png","250px-Royal_Coat_of_Arms_of_Portugal_with_Mantle.svg.png","276px-Philip_III_of_Spain.jpg","350px-Brasao_de_Aviz.PNG","AfonsoVIpt.jpg","Afonso_V.jpg","Anoniem_-_Koning_Johan_I_van_Portugal_(1450-1500)_-_Lissabon_Museu_Nacional_de_Arte_Antiga_19-10-2010_16-12-61.jpg","Armoiries_Portugal_1247.svg.png","Carlos_I_of_Portugal_by_José_Malhoa.jpg","CoA_of_Portugal_(1139-1247).svg.png","D._Fernando_II-F._Krumholz-1845.JPG","D._João_III_-_Cristóvão_Lopes_(attrib).png","D._Leonor_de_Aragão,_Rainha_de_Portugal_-_The_Portuguese_Genealogy_(Genealogia_dos_Reis_de_Portugal).png","D._Manuel_II_(1908)_-_Veloso_Salgado.png","D._Maria_II_Rainha.jpg","D._Pedro_II,_Rei_de_Portugal.JPG","Dom_Joao_II_de_Portugal.jpg","Illuminated_Portrayel_of_King_Duarte_I_of_Portugal,_Rui_de_Pina.PNG","Infanta_Caterina_of_Spain.jpg","John_V_of_Portugal_Pompeo_Batoni.jpg","Luisa_Francisca_de_Guzmán_y_Medina_Sidonia_atribuible_a_Alonso_Cano.png","Maria_I,_Queen_of_Portugal_-_Giuseppe_Troni,_atribuído_(Turim,_1739-Lisboa,_1810)_-_Google_Cultural_Institute.jpg","Nicolas_Antoine_Taunay_-_Retrato_da_Infanta_D._Isabel_Maria_de_Bragança.jpg","Philip_IV_King_of_Spain.jpg","Porto,_Portugal_(10552325653).jpg","Portrait_of_Joseph_Emanuel,_King_of_Portugal_(1773)_-_Miguel_António_do_Amaral.png","Retrato_de_D._João_VI,_Rei_de_Portugal.jpg","Retrato_de_D._Pedro_III_de_Portugal_-_oficina_europeia_ou_portuguesa_do_século_XVIII.png","Sebastião_de_Portugal,_c._1571-1574_-_Cristóvão_de_Morais.png"]        
        },
        {
            type: 'buildScripts',
            source: __dirname,
            destination: destination,
            fileNames: ['timeflow.js']
        }
    ];
    if(!excludeInfiniteCanvas){
        parallel.push({
            type: 'webpack',
            config: (forProduction) => infiniteCanvasWebpackConfig(fullDestination, forProduction)
        });
    }
    return {steps: [{parallel}]};
}