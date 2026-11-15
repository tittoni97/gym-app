// ---- exercise library (47 ids, same ids as the 3D demos) ----
// f flags: bar = barbell (plate calc), bw = bodyweight (no kg), assist = assist weight (more = easier), db = dumbbell/kettlebell,
// band = band, hold = seconds, lvl = level, round = interval slot
const LIB = {
squat:{n:'Barbell squat',f:'bar',g:'Overhand, hands just outside your shoulders',s:'Bar low on your upper back, elbows down, feet shoulder-width with toes slightly out. Set the safety bars.',t:['Brace your abs before every rep','Knees follow your toes','Parallel or slightly below, then drive through mid-foot']},
smithsquat:{n:'Smith machine squat',f:'bar',g:'Overhand, hands just outside your shoulders',s:'Place your feet slightly in front of the bar so your knees do not drift too far forward.',t:['Keep the whole foot flat on the floor','Chest up, brace before each rep','Control the way down']},
gobletsquat:{n:'Goblet squat (kettlebell)',f:'db',g:'Hold the kettlebell by the horns against your chest',s:'Feet shoulder-width, toes slightly out.',t:['Elbows point down between your knees','Keep your chest tall','Pause for a second at the bottom']},
bench:{n:'Barbell bench press',f:'bar',g:'Overhand, a bit wider than shoulders, thumbs wrapped around the bar',s:'Eyes under the bar. Use the rack safeties, and a spotter for heavy sets.',t:['Shoulder blades pinched back and down','Feet flat, touch the bar to mid-chest','Elbows about 45° from your body, press up and slightly back']},
smithbench:{n:'Smith machine bench press',f:'bar',g:'Overhand, a bit wider than shoulders',s:'Position the bench so the bar lowers to mid-chest.',t:['Line the bar up with your mid-chest','Shoulder blades pinched, feet flat','Rotate the bar to unlock only when you are ready']},
dbbench:{n:'Dumbbell bench press',f:'db',g:'Neutral or overhand, dumbbells over mid-chest',s:'Sit with the dumbbells on your thighs, then lie back and kick them up.',t:['Lower until elbows are just below the bench','Keep wrists straight over elbows','Bring the dumbbells together at the top']},
chestmachine:{n:'Vertical bench press machine',g:'Handles at mid-chest height, overhand or neutral',s:'Adjust the seat so the handles line up with your mid-chest.',t:['Back flat on the pad, shoulder blades back','Press without locking the elbows','Slow on the way back']},
lowrow:{n:'Low row',g:'Neutral (palms facing), V-handle',s:'Knees slightly bent, feet on the plate.',t:['Chest up, sit tall','Pull to your lower ribs and squeeze your shoulder blades','No swinging with your back']},
dbrow:{n:'One-arm dumbbell row',f:'db',g:'Neutral, palm facing your body',s:'Do all reps on one side, then switch. Use the same weight for both sides.',t:['Flat back, hand on the bench','Pull the elbow to your hip','Pause at the top']},
shoulderpress:{n:'Shoulder press machine',g:'Overhand, handles about shoulder-width',s:'Adjust the seat so the handles start at shoulder height.',t:['Back against the pad','Press straight up without shrugging','Lower until handles reach ear level']},
dbshoulder:{n:'Dumbbell shoulder press',f:'db',g:'Neutral or overhand, dumbbells at ear height',s:'Sit on a bench with the back support up.',t:['Back against the bench','Press up and slightly together','Control the way down']},
smithshoulder:{n:'Smith machine shoulder press',f:'bar',g:'Overhand, a little wider than shoulders',s:'Set the bench so the bar starts at chin height.',t:['Bench upright, back supported','Bar passes just in front of your face','Do not lock out hard']},
legcurl:{n:'Leg curl',g:'Hold the side handles',s:'Line your knees up with the machine pivot.',t:['Pad just above your heels','Curl smoothly, squeeze at the end','Slow lowering, no hip lifting']},
crunch:{n:'Abs bench crunch',f:'bw',g:'Hands crossed on your chest or lightly behind your head',s:'Hook your feet under the pad.',t:['Curl your ribs toward your hips','Do not pull on your neck','Breathe out as you come up']},
kneeraise:{n:'Hanging knee raise',f:'bw',g:'Overhand on the pull-up bar, shoulder-width',s:'Hang from the Bodytone bar with your shoulders pulled down.',t:['Curl your pelvis up, not just your knees','No swinging','Lower slowly']},
deadlift:{n:'Deadlift',f:'bar',g:'Double overhand. Use a mixed grip (one palm each way) only if it slips',s:'Hips higher than your knees, chest up, arms straight.',t:['Bar over mid-foot, shins close to the bar','Push the floor away, keep the bar touching your legs','Squeeze your glutes at the top, back stays flat']},
rdl:{n:'Romanian deadlift',f:'bar',g:'Overhand, hands just outside your thighs',s:'Start standing with the bar at your thighs.',t:['Push your hips back, soft knees','Bar slides along your legs','Stop when your hamstrings are well stretched']},
kbdeadlift:{n:'Kettlebell deadlift',f:'db',g:'Both hands on the handle',s:'Feet shoulder-width, kettlebell between your ankles.',t:['Kettlebell between your feet','Hips back, flat back','Stand tall and squeeze your glutes']},
assistpull:{n:'Assisted pull-ups',f:'assist',g:'Overhand (palms away), about 1.5 times shoulder width',s:'Kneel on the pad and choose the assist weight. More assistance means easier.',t:['Start from straight arms, shoulders down','Pull your elbows to your ribs','Chin over the bar, lower slowly']},
assistchin:{n:'Assisted chin-ups',f:'assist',g:'Underhand (palms toward you), shoulder-width',s:'Kneel on the pad and choose the assist weight.',t:['Chest to the bar','Elbows stay close to your body','Full stretch at the bottom']},
pulldown:{n:'Pull down',g:'Overhand, a bit wider than shoulders',s:'Thighs locked under the pad.',t:['Lean back slightly, chest up','Pull the bar to your upper chest','Elbows go down toward the floor']},
pulldownN:{n:'Pull down, neutral grip',g:'Neutral (palms facing), V-handle',s:'Thighs locked under the pad.',t:['Chest up, slight lean back','Pull the handle to your upper chest','Slow return, full stretch']},
legpress:{n:'Leg press',g:'Hold the side handles, feet shoulder-width in the middle of the plate',s:'Adjust the seat so you can reach a deep knee bend without your hips lifting.',t:['Lower until knees are about 90°','Keep your lower back on the seat','Do not lock your knees at the top']},
dip:{n:'Assisted dips',f:'assist',g:'Parallel bars, palms facing in',s:'Kneel on the pad and choose the assist weight.',t:['Lean slightly forward to hit the chest','Lower until upper arms are about parallel to the floor','Elbows go back, not wide']},
pushup:{n:'Push-ups',f:'bw',g:'Hands slightly wider than shoulders, fingers forward',s:'Hands under your shoulders to start.',t:['Straight line from head to heels','Chest to a fist above the floor','Elbows about 45° from your body']},
curl:{n:'Biceps curl machine',g:'Underhand, shoulder-width',s:'Sit so your upper arms rest flat on the pad.',t:['Armpits snug at the top of the pad','Elbows stay on the pad','Stop just short of fully straight arms']},
dbcurl:{n:'Dumbbell curl',f:'db',g:'Underhand, palms up',s:'Stand tall, feet hip-width.',t:['Elbows stay beside your ribs','Do not swing your body','Lower slowly']},
backext:{n:'Back extension (Lombari bench)',g:'Arms crossed on your chest, or hold a plate for more load',s:'Pad just below your hip bones, heels locked under the rollers.',t:['Hinge at your hips, back straight','Rise only until you form a straight line','Pause, then lower slowly']},
kickback:{n:'Rear kick machine',g:'Hold the handles, chest on the pad',s:'Do all reps on one leg, then switch. Pad against the back of your lower leg.',t:['Squeeze your glute to kick back','Do not arch your lower back','Slow return, no swinging']},
legext:{n:'Leg extension',g:'Hold the side handles',s:'Line your knees up with the machine pivot.',t:['Pad just above your ankles','Squeeze your thighs for one second at the top','Lower slowly, no swinging']},
calf:{n:'Calf machine',g:'Hold the handles, shoulders under the pads',s:'Balls of your feet on the edge of the platform.',t:['Full stretch at the bottom','Pause for a second on your toes','Slow and controlled']},
smithcalf:{n:'Smith machine calf raise',f:'bar',g:'Overhand on the Smith bar, shoulder-width',s:'Bar across your shoulders, same as a squat.',t:['Toes on a weight plate or step','Full stretch, then high on your toes','Pause at the top']},
kbswing:{n:'Kettlebell swing',f:'db',g:'Both hands overhand on the handle',s:'Feet a bit wider than shoulders, bell on the floor in front of you.',t:['It is a hip hinge, not a squat','Snap your hips, arms just hold on','Bell reaches chest height, back stays flat']},
hipthrust:{n:'Hip thrust',f:'db',g:'Hold a dumbbell or barbell across your hips, with a pad or folded towel',s:'Start with bodyweight or a light dumbbell and add load slowly.',t:['Upper back on the bench edge, feet flat','Chin tucked, ribs down, squeeze your glutes at the top','Hips level with shoulders and knees, do not arch']},
glutebridge:{n:'Glute bridge with band',f:'band',g:'Band just above your knees, arms flat on the floor',s:'Lie on your back, knees bent, feet flat and hip-width.',t:['Push your knees out against the band','Lift until shoulders, hips and knees form a line','Squeeze for a second at the top']},
bandrow:{n:'Seated band row',f:'band',g:'Neutral, one band end in each hand',s:'Loop the band around your feet, or around a fixed post at chest height.',t:['Chest up, sit tall','Pull to your lower ribs and squeeze your shoulder blades','Slow return, no swinging']},
inclinepress:{n:'Incline dumbbell press',f:'db',g:'Neutral, palms facing each other',s:'Bench at about 30 degrees.',t:['Shoulder blades back, elbows about 45° from your body','Control the way down','Press up and slightly together']},
pushupinc:{n:'Incline push-ups (hands on bench)',f:'bw',g:'Hands slightly wider than shoulders, fingers forward',s:'The higher the bench, the easier. Lower the height as you get stronger.',t:['Straight line from head to heels','Chest to the bench edge','Elbows about 45° from your body']},
dbrdl:{n:'Romanian deadlift (dumbbells)',f:'db',g:'Overhand or neutral, one dumbbell in each hand at your thighs',s:'Start standing tall. Keep your back flat the whole time.',t:['Push your hips back, soft knees','Dumbbells slide along your legs','Stop when your hamstrings are well stretched']},
plank:{n:'Forearm plank',f:'bw hold',g:'Forearms flat on the floor, elbows under your shoulders',s:'Log how many seconds you held. Add a few seconds each week.',t:['Straight line from head to heels','Squeeze glutes and abs, ribs down','Breathe slowly, stop when your hips sag']},
facepull:{n:'Band face pull',f:'band',g:'Overhand, one band end in each hand, hands wide',s:'Anchor the band at head height. Use a light band.',t:['Pull toward your forehead, elbows high and wide','Squeeze your shoulder blades together','Slow return, no shrugging']},
splitsquat:{n:'Split squat (dumbbells)',f:'db',g:'Neutral, one dumbbell in each hand at your sides',s:'Do all reps on one leg, then switch. Hold a rack or wall for balance if needed.',t:['Long step, front heel stays down','Drop your back knee straight down','Push through the front heel to stand']},
stepup:{n:'Dumbbell step-ups',f:'db',g:'Neutral, one dumbbell in each hand at your sides',s:'Use a bench or box at about knee height. Do all reps on one leg, then switch.',t:['Whole foot on the step','Push through the front heel, do not push off the back foot','Lower slowly']},
abductor:{n:'Hip abductor machine',g:'Hold the side handles',s:'Start with a light weight and a comfortable width.',t:['Sit tall, pads on the outside of your knees','Push your knees apart slowly and pause','Control the way back, do not let the plates crash']},
jumpsquat:{n:'Squat jumps',f:'bw round',g:'Arms swing forward and up, no equipment',s:'Make it low impact if your knees complain: do fast bodyweight squats instead.',t:['Land softly with bent knees','Swing your arms to jump higher','Stop the round when your landing gets noisy']},
climber:{n:'Mountain climbers',f:'bw round',g:'Hands under your shoulders, fingers forward',s:'Hands on a bench to make it easier.',t:['Straight line from head to heels','Drive your knees toward your chest','Fast but controlled']},
rower:{n:'Rower intervals',f:'lvl round',g:'Both hands on the handle, overhand',s:'Set the damper around 4 to 6. Log the damper level used.',t:['Legs push first, then lean back, then pull','Arms return first, then lean forward, then bend knees','Hard effort for the 20 seconds']}
};
// her-specific wording (shoulder care etc.)
const OVR = { her: {
 squat:{s:'Start with a light bar. Bar low on your upper back, elbows down, feet shoulder-width. Set the safety bars.'},
 inclinepress:{n:'Incline dumbbell press (light)',s:'Bench at about 30 degrees. No heavy overhead pressing for your right shoulder.',t:['Use a small range and light dumbbells','Shoulder blades back, elbows about 45° from your body','Stop the set if the right shoulder pinches']},
 chestmachine:{s:'Adjust the seat so the handles line up with your mid-chest. Use neutral handles if the machine has them.'},
 kneeraise:{s:'Hang from the Bodytone bar with your shoulders pulled down. Skip this one if the right shoulder complains and swap to the crunch.'},
 pulldownN:{s:'Thighs locked under the pad. Stop the pull before the shoulder pinches, do not go overhead into pain.'},
 gobletsquat:{s:'Feet shoulder-width, toes slightly out. Start light and add weight slowly.'},
 facepull:{s:'Anchor the band at head height. Use a light band. This protects your shoulder.'}
}};
const wk = (id, sets, reps, rest, alts, note, o) => Object.assign({ex:id, sets, reps, rest, alts: alts||[], note: note||''}, o||{});
const PLANS = {
him: [
 {id:'A',name:'Day A',focus:'Squat and bench',warm:'5 min easy on the rower, then 2 light ramp-up sets of your first lift.',slots:[
  wk('squat',4,'5-6','2-3 min',['smithsquat','legpress','gobletsquat']),
  wk('bench',4,'6-8','2-3 min',['chestmachine','smithbench','dbbench']),
  wk('lowrow',3,'8-12','60-90 sec',['pulldownN','dbrow']),
  wk('shoulderpress',3,'10','60-90 sec',['dbshoulder','smithshoulder']),
  wk('legcurl',3,'10-12','60-90 sec',['rdl','backext']),
  wk('crunch',3,'12-15','60 sec',['kneeraise'])]},
 {id:'B',name:'Day B',focus:'Deadlift and pull',warm:'5 min easy on the rower, then 2 light ramp-up sets of your first lift.',slots:[
  wk('deadlift',3,'5','2-3 min',['rdl','kbdeadlift']),
  wk('assistpull',4,'6-10','90 sec',['assistchin','pulldown']),
  wk('chestmachine',3,'8-10','90 sec',['dbbench','pushup']),
  wk('legpress',3,'10-12','90 sec',['smithsquat','gobletsquat']),
  wk('dip',3,'8-10','90 sec',['pushup','chestmachine']),
  wk('curl',2,'10-12','60 sec',['dbcurl']),
  wk('backext',3,'12','60 sec',['rdl','kbswing'])]},
 {id:'C',name:'Day C',focus:'Volume and machines',warm:'5 min easy on the rower, then 2 light ramp-up sets of your first lift.',slots:[
  wk('squat',3,'8','2 min',['smithsquat','gobletsquat'],'Lighter than Day A.'),
  wk('bench',3,'8-10','2 min',['dbbench','smithbench'],'Lighter than Day A.'),
  wk('pulldown',4,'8-12','90 sec',['pulldownN','assistpull']),
  wk('kickback',3,'12 each leg','60 sec',['kbswing','rdl']),
  wk('legext',3,'12','60 sec',['legpress','smithsquat']),
  wk('calf',3,'12-15','60 sec',['smithcalf']),
  wk('kbswing',3,'15','60 sec',['rdl','kbdeadlift'],'Finisher.')]}
],
her: [
 {id:'A',name:'Day A',focus:'Squat and pull',warm:'5 min easy on the bike or rower, or a brisk walk, then 2 light ramp-up sets of your first lift.',banner:'Right shoulder: stay pain-free on every press and pull. If it pinches, stop and use the alternative.',slots:[
  wk('gobletsquat',3,'8-10','90 sec',['squat','smithsquat','legpress']),
  wk('hipthrust',3,'10','90 sec',['glutebridge']),
  wk('lowrow',3,'10-12','60-90 sec',['dbrow','bandrow']),
  wk('inclinepress',3,'10','60-90 sec',['chestmachine','pushupinc']),
  wk('legcurl',3,'12','60 sec',['dbrdl','glutebridge']),
  wk('crunch',3,'12-15','60 sec',['plank','kneeraise']),
  wk('facepull',2,'15','45 sec',['bandrow'],'Shoulder care.'),
  wk('jumpsquat',6,'20 sec','40 sec',['kbswing','climber'],'Finisher: 20 sec hard, 40 sec off.',{round:1})]},
 {id:'B',name:'Day B',focus:'Hinge and glutes',warm:'5 min easy on the bike or rower, or a brisk walk, then 2 light ramp-up sets of your first lift.',banner:'Right shoulder: stay pain-free on every press and pull. If it pinches, stop and use the alternative.',slots:[
  wk('dbrdl',3,'8-10','90 sec',['rdl','kbdeadlift']),
  wk('splitsquat',3,'8 each leg','90 sec',['stepup','gobletsquat']),
  wk('pulldownN',3,'10-12','60-90 sec',['lowrow','dbrow']),
  wk('pushupinc',3,'8-10','60-90 sec',['pushup','chestmachine']),
  wk('kickback',3,'12 each leg','60 sec',['hipthrust','glutebridge']),
  wk('kneeraise',3,'8-12','60 sec',['plank','crunch']),
  wk('facepull',2,'15','45 sec',['bandrow'],'Shoulder care.'),
  wk('climber',6,'20 sec','40 sec',['jumpsquat','rower'],'Finisher: 20 sec hard, 40 sec off.',{round:1})]},
 {id:'C',name:'Day C',focus:'Legs, glutes and abs',warm:'5 min easy on the bike or rower, or a brisk walk, then 2 light ramp-up sets of your first lift.',banner:'Right shoulder: stay pain-free on every press and pull. If it pinches, stop and use the alternative.',slots:[
  wk('legpress',3,'10-12','90 sec',['gobletsquat','smithsquat']),
  wk('glutebridge',3,'12-15','60 sec',['hipthrust']),
  wk('stepup',3,'10 each leg','60-90 sec',['splitsquat','gobletsquat']),
  wk('dbrow',3,'10 each arm','60-90 sec',['lowrow','bandrow']),
  wk('abductor',3,'15','60 sec',['kickback']),
  wk('plank',3,'30-45 sec','45 sec',['crunch','kneeraise']),
  wk('facepull',2,'15','45 sec',['bandrow'],'Shoulder care.'),
  wk('kbswing',6,'20 sec','40 sec',['rower','jumpsquat'],'Finisher: 20 sec hard, 40 sec off.',{round:1})]}
]};
const PROFILES = {
 him:{label:'Him',accent:'#ff6a3d',goalLo:75,goalHi:80,startKg:83,height:180,weekly:3},
 her:{label:'Her',accent:'#a78bfa',goalLo:60,goalHi:60,startKg:64,height:164,weekly:3}
};
// his logged history (from the old app), converted: date -> day -> [exercise, [[kg,reps],...]]
const SEED_HIM = [
 ['2026-10-19','A',[['gobletsquat',[[12,10],[12,11],[12,11],[12,10]]],['bench',[[40,10],[40,8],[40,8],[40,7]]],['lowrow',[[20,12],[20,12],[20,10]]],['shoulderpress',[[12,10],[12,10],[12,10]]],['legcurl',[[37.5,12],[37.5,12],[34.5,9]]],['crunch',[[0,15],[0,15],[0,15]]]]],
 ['2026-10-21','B',[['deadlift',[[60,5],[60,5],[60,5]]],['assistpull',[[30,8],[30,7],[30,6],[30,6]]],['pushup',[[0,10],[0,10],[0,5]]],['legpress',[[40,12],[60,12],[60,12]]],['dip',[[30,8],[40,8],[40,8]]],['curl',[[8,12],[8,12]]]]],
 ['2026-10-26','C',[['gobletsquat',[[12,12],[12,12],[12,12]]],['bench',[[40,10],[40,10],[40,10]]],['pulldown',[[40,12],[60,12],[60,12],[60,12]]],['kickback',[[0,12],[0,12],[0,12]]],['legext',[[35,12],[35,12],[35,12]]],['calf',[[0,15],[0,15],[0,15]]],['kbswing',[[8,15],[10,15],[10,15]]]]],
 ['2026-10-27','A',[['gobletsquat',[[12,12],[16,12],[16,12],[16,12]]],['chestmachine',[[20,10],[30,10],[40,10],[40,8]]],['lowrow',[[40,10],[40,12],[40,10]]],['shoulderpress',[[12,10],[12,10],[12,10]]],['legcurl',[[40,10],[40,10],[40,10]]]]],
 ['2026-10-29','B',[['deadlift',[[80,5],[80,5],[80,5]]],['assistpull',[[30,10],[30,8],[30,7],[30,7]]],['dbbench',[[50,10],[50,7],[50,6]]],['legpress',[[80,12],[80,11],[80,10]]],['curl',[[12,10],[12,10]]]]],
 ['2026-11-02','C',[['squat',[[40,8],[40,8],[40,8]]],['bench',[[50,10],[50,8],[50,6]]],['pulldown',[[70,12],[70,11],[70,10],[70,9]]],['kickback',[[5,12],[5,12]]],['legext',[[40,12],[40,12],[40,12]]],['calf',[[5,15],[5,15]]]]],
 ['2026-11-06','A',[['squat',[[40,6],[45,6],[47.5,6],[47.5,6]]],['smithbench',[[35,8],[35,7],[35,6],[35,6]]],['lowrow',[[40,12],[40,12],[40,12]]],['shoulderpress',[[12,12],[12,12],[12,12]]],['legcurl',[[40,12],[40,10],[40,10]]],['crunch',[[0,20]]]]]
];
