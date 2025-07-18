<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Datas extends Model
{
    use HasFactory;

    protected $table = 'datas';

    protected $fillable = [
        'user_id', 
        'loc_id',
        'is_trash', 
        'water_lvl', 
        'file_path'
    ];

    public $timestamps = false;
}
