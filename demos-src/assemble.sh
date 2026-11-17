cd /home/claude/sq
python3 - <<'PY'
parts=['part_scene.js','part_helpers.js','part_measure.js','part_ik.js','part_squat.js','part_engine.js','part_main.js']
open('main.js','w').write('\n'.join(open(p).read() for p in parts))
PY
bash build.sh
