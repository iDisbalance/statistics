function randn_bm() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm() // resample between 0 and 1
    return num
  }

export const getRundomNumber = (min, max) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min)
}

function randn_bm_limited(min, max, skew) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random()
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
    
    num = num / 10.0 + 0.5 // Translate to 0 -> 1
    if (num > 1 || num < 0) 
      num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range
    
    else{
      num = Math.pow(num, skew) // Skew
      num *= max - min // Stretch to fill range
      num += min // offset to min
    }
    return num
  }

export const generateArrayOfNumbers = (number, isNormal, min, max) => {
    const numbers = []
    for(let i = 0; i < number; i++) {
        numbers.push(isNormal ? Math.round(randn_bm() * 10) / 10 : Math.round(randn_bm_limited(min, max, 1)))
    }
    return numbers
}

export const getBaseLog = (x, y) => {
    return Math.log(y) / Math.log(x);
  }

  export const makeTableData = (generatedArr) => {
    const xMax = generatedArr[generatedArr.length - 1]
    const xMin = generatedArr[0]
    const r = xMax - xMin
    const m = 1 + 3.3221 * getBaseLog(10, 100)
    const k = r / m
    const roundedK = Math.round(k)
    const roundedM = Math.round(m)
    let Xstart = xMin - roundedK / 2
    const tableData = {
        colls: [
            'i',
            'Інтервали',
            'Середини інтервалів',
            'Частота',
            'Частість',
            'Накопичена частота',
            'Накопичена частість'
        ],
        i: [],
        intervals: [],
        intervalMiddles: [],
        frequency: [],
        subFrequency: [],
        collectedFrequency: [],
        collectedSubFrequency: [],
        sums: []
    }
    let buf = 0
    for(let i = 0; Xstart < xMax; i++) {
        tableData.i.push(i+1)
        tableData.intervals.push(`${Xstart} - ${Xstart + roundedK}`)
        tableData.intervalMiddles.push(Math.round(((Xstart + roundedK + Xstart) / 2) * 100) / 100)
        const ni = generatedArr.filter(el => el > Xstart && el <= Xstart + roundedK).length
        tableData.frequency.push(ni)
        tableData.subFrequency.push(ni / generatedArr.length)
        tableData.collectedFrequency.push(ni + buf)
        tableData.collectedSubFrequency.push((ni + buf) / generatedArr.length)
        buf = buf + ni
        Xstart += roundedK
    }
    tableData.sums = [Math.round(tableData.collectedFrequency[tableData.collectedFrequency.length - 1]), 
    Math.round(tableData.subFrequency.reduce((previousValue, currentValue) => previousValue + currentValue))]
    return tableData
}

export const determinant = m => 
m.length == 1 ?
m[0][0] :
m.length == 2 ? 
m[0][0]*m[1][1]-m[0][1]*m[1][0] :
m[0].reduce((r,e,i) => 
  r+(-1)**(i+2)*e*determinant(m.slice(1).map(c => 
    c.filter((_,j) => i != j))),0)

    export const getLaplasValue = (num) => {
      const absoluteNum = Math.abs(num)
      const table = getLaplasTable()
      let minDelta = 1000
      let searchedId = -1
      table.forEach((item, id) => {
        if(minDelta > Math.abs(item.f - absoluteNum)){
          minDelta = Math.abs(item.f - absoluteNum)
          searchedId = id
        }
      })
      return num > 0 ? parseFloat(table[searchedId].x) : -parseFloat(table[searchedId].x)
    }
    
    export const getLaplasTable = () => {
      const kek = `0.00	0.00000
    0.01	0.00798
    0.02	0.01596
    0.03	0.02393
    0.04	0.03191
    0.05	0.03988
    0.06	0.04784
    0.07	0.05581
    0.08	0.06376
    0.09	0.07171
    0.10	0.07966
    0.11	0.08759
    0.12	0.09552
    0.13	0.10348
    0.14	0.11134
    0.15	0.11924
    0.16	0.12712
    0.17	0.13499
    0.18	0.14285
    0.19	0.15069
    0.20	0.15852
    0.21	0.16633
    0.22	0.17413
    0.23	0.18191
    0.24	0.18967
    0.25	0.19741
    0.26	0.20514
    0.27	0.21284
    0.28	0.22052
    0.29	0.22818
    0.30	0.23582
    0.31	0.24344
    0.32	0.25103
    0.33	0.25860
    0.34	0.26614
    0.35	0.27366
    0.36	0.28115
    0.37	0.28862
    0.38	0.29605
    0.39	0.30346
    0.40	0.31084
    0.41	0.31819
    0.42	0.32552
    0.43	0.33280
    0.44	0.34006
    0.45	0.34729
    0.46	0.35448
    0.47	0.36164
    0.48	0.36877
    0.49	0.37587
    0.50	0.38292
    0.51	0.38995
    0.52	0.39694
    0.53	0.40389
    0.54	0.41080
    0.55	0.41768
    0.56	0.42452
    0.57	0.43132
    0.58	0.43809
    0.59	0.44481
    0.60	0.45149
    0.61	0.45814
    0.62	0.46474
    0.63	0.47131
    0.64	0.47783
    0.65	0.48431
    0.66	0.49075
    0.67	0.49714
    0.68	0.50350
    0.69	0.50981
    0.70	0.51607
    0.71	0.52230
    0.72	0.52848
    0.73	0.53461
    0.74	0.54070
    0.75	0.54675
    0.76	0.55275
    0.77	0.55870
    0.78	0.56461
    0.79	0.57047
    0.80	0.57629
    0.81	0.58206
    0.82	0.58778
    0.83	0.59346
    0.84	0.59909
    0.85	0.60468
    0.86	0.61021
    0.87	0.61570
    0.88	0.62114
    0.89	0.62653
    0.90	0.63188
    0.91	0.63718
    0.92	0.64243
    0.93	0.64763
    0.94	0.65278
    0.95	0.65789
    0.96	0.66294
    0.97	0.66795
    0.98	0.67291
    0.99	0.67783
    1.00	0.68269
    1.01	0.68750
    1.02	0.69227
    1.03	0.69699
    1.04	0.70166
    1.05	0.70628
    1.06	0.71086
    1.07	0.71538
    1.08	0.71986
    1.09	0.72429
    1.10	0.72867
    1.11	0.73300
    1.12	0.73729
    1.13	0.74152
    1.14	0.74571
    1.15	0.74986
    1.16	0.75395
    1.17	0.75800
    1.18	0.76200
    1.19	0.76595
    1.20	0.76986
    1.21	0.77372
    1.22	0.77754
    1.23	0.78130
    1.24	0.78502
    1.25	0.78870
    1.26	0.79233
    1.27	0.79592
    1.28	0.79945
    1.29	0.80295
    1.30	0.80640
    1.31	0.80980
    1.32	0.81316
    1.33	0.81648
    1.34	0.81975
    1.35	0.82298
    1.36	0.82617
    1.37	0.82931
    1.38	0.83241
    1.39	0.83547
    1.40	0.83849
    1.41	0.84146
    1.42	0.84439
    1.43	0.84728
    1.44	0.85013
    1.45	0.85294
    1.46	0.85571
    1.47	0.85844
    1.48	0.86113
    1.49	0.86378
    1.50	0.86639
    1.51	0.86696
    1.52	0.87149
    1.53	0.87398
    1.54	0.87644
    1.55	0.87886
    1.56	0.88124
    1.57	0.88358
    1.58	0.88589
    1.59	0.88817
    1.60	0.89040
    1.61	0.89260
    1.62	0.89477
    1.63	0.89690
    1.64	0.89899
    1.65	0.90106
    1.66	0.90309
    1.67	0.90508
    1.68	0.90704
    1.69	0.90897
    1.70	0.91087
    1.71	0.91273
    1.72	0.91457
    1.73	0.91637
    1.74	0.91814
    1.75	0.91988
    1.76	0.92159
    1.77	0.92327
    1.78	0.92492
    1.79	0.92655
    1.80	0.92814
    1.81	0.92970
    1.82	0.93124
    1.83	0.93275
    1.84	0.93423
    1.85	0.93569
    1.86	0.93711
    1.87	0.93852
    1.88	0.93989
    1.89	0.94124
    1.90	0.94257
    1.91	0.94387
    1.92	0.94514
    1.93	0.94639
    1.94	0.94762
    1.95	0.94882
    1.96	0.95000
    1.97	0.95116
    1.98	0.95230
    1.99	0.95341
    2.00	0.95450
    2.01	0.95557
    2.02	0.95662
    2.03	0.95764
    2.04	0.95865
    2.05	0.95964
    2.06	0.96060
    2.07	0.96155
    2.08	0.96247
    2.09	0.96338
    2.10	0.96427
    2.11	0.96514
    2.12	0.96599
    2.13	0.96683
    2.14	0.96765
    2.15	0.96844
    2.16	0.96923
    2.17	0.96999
    2.18	0.97074
    2.19	0.97148
    2.20	0.97219
    2.21	0.97289
    2.22	0.97358
    2.23	0.97425
    2.24	0.97491
    2.25	0.97555
    2.26	0.97618
    2.27	0.97679
    2.28	0.97739
    2.29	0.97798
    2.30	0.97855
    2.31	0.97911
    2.32	0.97966
    2.33	0.98019
    2.34	0.98072
    2.35	0.98123
    2.36	0.98172
    2.37	0.98221
    2.38	0.98269
    2.39	0.98315
    2.40	0.98360
    2.41	0.98405
    2.42	0.98448
    2.43	0.98490
    2.44	0.98531
    2.45	0.98571
    2.46	0.98611
    2.47	0.98649
    2.48	0.98686
    2.49	0.98723
    2.50	0.98758
    2.51	0.98793
    2.52	0.98826
    2.53	0.98859
    2.54	0.98891
    2.55	0.98923
    2.56	0.98953
    2.57	0.98983
    2.58	0.99012
    2.59	0.99040
    2.60	0.99068
    2.61	0.99095
    2.62	0.99121
    2.63	0.99146
    2.64	0.99171
    2.65	0.99195
    2.66	0.99219
    2.67	0.99241
    2.68	0.99263
    2.69	0.99285
    2.70	0.99307
    2.71	0.99327
    2.72	0.99347
    2.73	0.99367
    2.74	0.99386
    2.75	0.99404
    2.76	0.99422
    2.77	0.99439
    2.78	0.99456
    2.79	0.99473
    2.80	0.99489
    2.81	0.99505
    2.82	0.99520
    2.83	0.99535
    2.84	0.99549
    2.85	0.99563
    2.86	0.99576
    2.87	0.99590
    2.88	0.99602
    2.89	0.99615
    2.90	0.99627
    2.91	0.99639
    2.92	0.99650
    2.93	0.99661
    2.94	0.99672
    2.95	0.99682
    2.96	0.99692
    2.97	0.99702
    2.98	0.99712
    2.99	0.99721
    3.00	0.99730
    3.01	0.99739
    3.02	0.99747
    3.03	0.99755
    3.04	0.99763
    3.05	0.99771
    3.06	0.99779
    3.07	0.99786
    3.08	0.99793
    3.09	0.99800
    3.10	0.99806
    3.11	0.99813
    3.12	0.99819
    3.13	0.99825
    3.14	0.99831
    3.15	0.99837
    3.16	0.99842
    3.17	0.99848
    3.18	0.99853
    3.19	0.99858
    3.20	0.99863
    3.21	0.99867
    3.22	0.99872
    3.23	0.99876
    3.24	0.99880
    3.25	0.99855
    3.26	0.99889
    3.27	0.99892
    3.28	0.99896
    3.29	0.99900
    3.30	0.99903
    3.31	0.99907
    3.32	0.99910
    3.33	0.99913
    3.34	0.99916
    3.35	0.99919
    3.36	0.99922
    3.37	0.99925
    3.38	0.99928
    3.39	0.99930
    3.40	0.99933
    3.41	0.99935
    3.42	0.99937
    3.43	0.99940
    3.44	0.99942
    3.45	0.99944
    3.46	0.99946
    3.47	0.99948
    3.48	0.99950
    3.49	0.99952
    3.50	0.99953
    3.51	0.99955
    3.52	0.99957
    3.53	0.99958
    3.54	0.99960
    3.55	0.99961
    3.56	0.99963
    3.57	0.99964
    3.58	0.99966
    3.59	0.99967
    3.60	0.99968
    3.61	0.99969
    3.62	0.99971
    3.63	0.99972
    3.64	0.99973
    3.65	0.99974
    3.66	0.99975
    3.67	0.99976
    3.68	0.99977
    3.69	0.99978
    3.70	0.99978
    3.71	0.99979
    3.72	0.99980
    3.73	0.99981
    3.74	0.99982
    3.75	0.99982
    3.76	0.99983
    3.77	0.99984
    3.78	0.99984
    3.79	0.99985
    3.80	0.99986
    3.81	0.99986
    3.82	0.99987
    3.83	0.99987
    3.84	0.99988
    3.85	0.99988
    3.86	0.99989
    3.87	0.99989
    3.88	0.99990
    3.89	0.99990
    3.90	0.99990
    3.91	0.99991
    3.92	0.99991
    3.93	0.99992
    3.94	0.99992
    3.95	0.99992
    3.96	0.99992
    3.97	0.99993
    3.98	0.99993
    3.99	0.99993`
    const rows = kek.split('\n')
    const table = rows.map(row => {
      return {
        x: row.split('\t')[0],
        f: row.split('\t')[1] / 2
      }
    })
    return table
    }