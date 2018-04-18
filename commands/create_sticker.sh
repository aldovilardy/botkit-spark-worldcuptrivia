#!/bin/bash

usage() { echo "Usage: $0 [-in=<inputfilename>] [-out=<outputfilename>] [-name='name'] [-org='organization'] [-dob='dateofbirth'] [-y=year]" 1>&2; exit 1; }

for i in "$@"
do
    case $i in
        -in*|--inputfile=*)
        in="${i#*=}"
        ;;

        -out*|--outputfilename=*)
        out="${i#*=}"
        ;;

        -name*)
        name="${i#*=}"
        ;;

        -org*|--organization=*)
        org="${i#*=}"
        ;;

        -dob*|--dateofbirth=*)
        dob="${i#*=}"
        ;;

        -y*|--year=*)
        year="${i#*=}"
        ;;
        *)
            # unknown option
        ;;
    esac

done

if [ -z "${in}" ] || [ -z "${out}" ]; then
    usage
fi

echo IN = ${in}
echo OUT = ${out}
echo NAME = ${name}
echo DOB = ${dob}
echo YEAR = ${year}

#
# Create a mask 
#
convert commands/mask_col.png \( ${in} -resize 1536x2048^ \) -compose overlay -composite commands/mask_col.png -composite commands/outtemp.png

#
# Insert the text overlay
#
convert commands/outtemp.png -font Whitney-Semibold -weight 700  -pointsize 70 -draw "fill black text 300,1860 '${name}' " -pointsize 50 -draw "gravity northeast fill black text 100,1900 '${org}' " -pointsize 50 -draw "gravity northeast fill black text 800,1710 '${dob}' " -pointsize 50 -draw "gravity northeast fill black text 200,315 '${year}' " ${out}