//plugin.js will run in the game.
//change or add dialog:
if (navigator.language.includes('zh')) { //if lang is chinese
    window.dialog['entity.test.name'] = '插件測試實體(中文)';
    window.dialog['entity.test.intro'] = '測試介紹';
} else if (navigator.language.includes('ja')) { //if lang is japanese
    window.dialog['entity.test.name'] = 'プラグインテストエンティティ(日本語)';
    window.dialog['entity.test.intro'] = 'テストの紹介';
} else { //just else
    window.dialog['entity.test.name'] = 'PLugin Test Entity(English)';
    window.dialog['entity.test.intro'] = 'Test Introduction';
}
//add hero:
$('.entityselect').append('<div class=\'test entity\'></div>');
window.entity1['test'] = {
    "name": "entity.test.name",
    "introduction": "entity.test.intro",
    "id": "test",
    "hp": 10,
    "hprestorespeed": 5000,
    "hprestorevalue": 1,
    "mp": 10,
    "mprestorespeed": 5000,
    "mprestorevalue": 1,
    "skin": {
        "normal": {
            "action": {
                "normal": {
                    "src": "./textures/entity/hero/warrior/warrior.png"
                },
                "lobby": {
                    "src": "./textures/entity/hero/warrior/warrior.png"
                }
            }
        }
    }
}
/*$('.test.entity').css({
    'left': '10%',
    'top': '10%'
});*/
window.entity.push(window.entity1['test']);
